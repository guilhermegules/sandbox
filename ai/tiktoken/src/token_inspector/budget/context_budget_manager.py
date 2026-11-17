from typing import Any, Dict, List, Optional
import copy
import json

from token_inspector.budget.json_ast_pruner import JsonAstPruner
from token_inspector.budget.markdown_fence_repairer import MarkdownFenceRepairer
from token_inspector.budget.priority_allocator import PriorityAllocator
from token_inspector.budget.sliding_window_pruner import SlidingWindowPruner
from token_inspector.models.budget_schemas import (
    BudgetExceededError,
    ContextBudgetRequest,
    ContextMessage,
    PriorityTier,
    TruncationDiff,
    TruncationResult,
)
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.chat_formatter import ChatFormatter
from token_inspector.tokenizer.model_registry import ModelRegistry


class ContextBudgetManager:
    """Orchestrates priority allocation, sliding-window turn pruning, JSON AST pruning, and fence repairs."""

    def __init__(
        self,
        registry: Optional[ModelRegistry] = None,
        chat_formatter: Optional[ChatFormatter] = None,
        priority_allocator: Optional[PriorityAllocator] = None,
        sliding_window_pruner: Optional[SlidingWindowPruner] = None,
        json_ast_pruner: Optional[JsonAstPruner] = None,
        fence_repairer: Optional[MarkdownFenceRepairer] = None,
    ) -> None:
        self.registry = registry or ModelRegistry()
        self.formatter = chat_formatter or ChatFormatter(registry=self.registry)
        self.allocator = priority_allocator or PriorityAllocator(registry=self.registry)
        self.sliding_pruner = sliding_window_pruner or SlidingWindowPruner(
            formatter=self.formatter, registry=self.registry
        )
        self.json_pruner = json_ast_pruner or JsonAstPruner(registry=self.registry)
        self.fence_repairer = fence_repairer or MarkdownFenceRepairer()

    def _get_encoder(self, model: str) -> BPEEncoder:
        encoding_name = self.registry.get_encoding_name(model)
        return BPEEncoder(encoding_name=encoding_name)

    def manage_budget(self, request: ContextBudgetRequest) -> TruncationResult:
        encoder = self._get_encoder(request.model)
        raw_messages: List[Dict[str, Any]] = [
            m.model_dump(exclude_none=True) for m in request.messages
        ]

        original_tokens = self.formatter.count_chat_tokens(raw_messages, model=request.model)
        pruned_indices: List[int] = []
        markdown_repaired = False
        json_validated = False

        # If already within budget, perform syntax checks and return
        if original_tokens <= request.max_tokens:
            if request.auto_close_markdown:
                for msg in raw_messages:
                    content_str = str(msg.get("content", ""))
                    if self.fence_repairer.is_unclosed(content_str):
                        msg["content"] = self.fence_repairer.repair(content_str)
                        markdown_repaired = True

            diff = TruncationDiff(
                original_tokens=original_tokens,
                truncated_tokens=original_tokens,
                tokens_saved=0,
                pruned_message_indices=[],
            )
            return TruncationResult(
                messages=raw_messages,
                diff=diff,
                is_budget_satisfied=True,
                json_ast_validated=True,
                markdown_repaired=markdown_repaired,
            )

        # Calculate P1 and P2 baseline tokens
        p1_msgs = [m for m in request.messages if m.priority == PriorityTier.SYSTEM_RULES]
        p2_msgs = [m for m in request.messages if m.priority == PriorityTier.USER_QUERY]

        p1_p2_raw = [
            m.model_dump(exclude_none=True)
            for m in request.messages
            if m.priority in (PriorityTier.SYSTEM_RULES, PriorityTier.USER_QUERY)
        ]
        p1_p2_tokens = self.formatter.count_chat_tokens(p1_p2_raw, model=request.model)

        # Monolithic overflow check
        if p1_p2_tokens > request.max_tokens:
            if not request.allow_user_truncation:
                saturation = round((p1_p2_tokens / request.max_tokens) * 100.0, 2)
                raise BudgetExceededError(
                    f"System rules and user query alone consume {p1_p2_tokens} tokens "
                    f"({saturation}% of {request.max_tokens} budget ceiling).",
                    current_tokens=original_tokens,
                    max_tokens=request.max_tokens,
                )
            else:
                # Apply head/tail truncation to the P2 user query
                p1_tokens = sum(encoder.count_tokens(str(m.content)) for m in p1_msgs)
                # Reserve 30 tokens for ChatML formatting and assistant primer
                avail_tokens = max(50, request.max_tokens - p1_tokens - 30)

                for idx, msg in enumerate(raw_messages):
                    if request.messages[idx].priority == PriorityTier.USER_QUERY:
                        user_text = str(msg.get("content", ""))
                        token_ids = encoder.encode(user_text)
                        total_user_tokens = len(token_ids)
                        if total_user_tokens > avail_tokens:
                            # Estimate marker tokens
                            sample_marker = "\n... [truncated 9999 tokens] ...\n"
                            marker_cost = encoder.count_tokens(sample_marker)
                            budget_for_text = max(20, avail_tokens - marker_cost)

                            head_count = max(5, int(budget_for_text * 0.20))
                            tail_count = max(5, budget_for_text - head_count)
                            truncated_amt = max(0, total_user_tokens - (head_count + tail_count))

                            marker = f"\n... [truncated {truncated_amt} tokens] ...\n"
                            head_part = encoder.decode(token_ids[:head_count])
                            tail_part = encoder.decode(token_ids[-tail_count:])
                            msg["content"] = head_part + marker + tail_part
                            # Mark few-shot and history as pruned
                            for other_idx, other_m in enumerate(request.messages):
                                if other_m.priority in (
                                    PriorityTier.FEW_SHOT,
                                    PriorityTier.CHAT_HISTORY,
                                ):
                                    pruned_indices.append(other_idx)

                # Keep only P1 and P2
                raw_messages = [
                    raw_messages[i]
                    for i in range(len(raw_messages))
                    if request.messages[i].priority in (
                        PriorityTier.SYSTEM_RULES,
                        PriorityTier.USER_QUERY,
                    )
                ]

        # Standard pruning: sliding window on history (P4) and few-shot (P3)
        current_tokens = self.formatter.count_chat_tokens(raw_messages, model=request.model)
        if current_tokens > request.max_tokens:
            # Use sliding window pruner on messages
            pruned_list, dropped = self.sliding_pruner.prune(
                raw_messages,
                max_tokens=request.max_tokens,
                model=request.model,
                preserve_system=True,
            )
            raw_messages = pruned_list
            pruned_indices.extend(dropped)

        # JSON AST syntax check / pruning on any message content
        if request.ensure_json_syntax:
            for msg in raw_messages:
                content = msg.get("content")
                if isinstance(content, str) and (content.strip().startswith("{") or content.strip().startswith("[")):
                    try:
                        json.loads(content)
                        json_validated = True
                    except json.JSONDecodeError:
                        msg["content"] = self.json_pruner.prune(
                            content, max_tokens=request.max_tokens, model=request.model
                        )
                        json_validated = True
            json_validated = True

        # Markdown fence auto-repair
        if request.auto_close_markdown:
            for msg in raw_messages:
                content_str = str(msg.get("content", ""))
                if self.fence_repairer.is_unclosed(content_str):
                    msg["content"] = self.fence_repairer.repair(content_str)
                    markdown_repaired = True

        final_tokens = self.formatter.count_chat_tokens(raw_messages, model=request.model)
        saved = max(0, original_tokens - final_tokens)

        diff = TruncationDiff(
            original_tokens=original_tokens,
            truncated_tokens=final_tokens,
            tokens_saved=saved,
            pruned_message_indices=sorted(list(set(pruned_indices))),
        )

        return TruncationResult(
            messages=raw_messages,
            diff=diff,
            is_budget_satisfied=final_tokens <= request.max_tokens,
            json_ast_validated=json_validated,
            markdown_repaired=markdown_repaired,
        )
