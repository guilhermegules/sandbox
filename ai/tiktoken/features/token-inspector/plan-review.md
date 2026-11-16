# Plan Review: Token Inspector

**Feature Name**: `token-inspector`  
**Reviewer**: `Plan Reviewer & Product Auditor`  
**Date**: 2026-11-16  
**Target Plan**: [`features/token-inspector/plan.md`](file:///home/ggm/Work/tiktoken/features/token-inspector/plan.md)  
**Verdict**: `PLAN_APPROVED` ✅  

---

## 1. Executive Summary & Audit Verdict

The feature plan for **Token Inspector** (`features/token-inspector/plan.md`) has undergone an adversarial audit. The plan addresses a pervasive, high-friction pain point in LLM application engineering: developer "token blindness," format inefficiency, unhandled context window overflow, and unmeasured sampling variance.

### Final Verdict: `PLAN_APPROVED`
The plan is crisp, well-bounded, technically sound, and fully equipped with objective, testable Given/When/Then acceptance criteria across all six functional user stories. It adheres to modern engineering standards and explicitly delineates scope boundaries.

**Next Pipeline Stage**: Because Token Inspector includes an interactive web dashboard alongside its CLI, it advances autonomously to **Stage 3: UI/UX Design** (`design-ux` / `features/token-inspector/design.md`) prior to technical architecture.

---

## 2. Evaluation Rubric & Audit Scorecard

| Evaluation Dimension | Rating | Findings & Assessment |
| :--- | :---: | :--- |
| **1. Problem Clarity & Beneficiaries** | **Exceptional** | Accurately identifies the cost, latency, and context overflow risks stemming from subword BPE tokenization, verbose formatting, and stochastic generation. Target personas (App Engineer, Prompt Engineer, QA Researcher, Local Operator) are distinct and realistic. |
| **2. Scope Tightness & Non-Goals** | **High** | Boundaries are strictly drawn. Non-goals (NG-1 through NG-5) explicitly disclaim enterprise gateway features, model training, external telemetry, proprietary closed tokenizer reverse-engineering, and heavy distributed infrastructure. |
| **3. Acceptance Criteria (Given/When/Then)** | **Exceptional** | All 6 user stories provide concrete, deterministic, and verifiable acceptance criteria (19 total criteria) covering happy paths, edge cases, streaming pass-through, and AST pruning validation. |
| **4. Feasibility & Risk Coverage** | **High** | Key engineering pitfalls (streaming proxy latency, chat template token overhead, mid-string JSON truncation corruption, upstream rate limits) are recognized with sound mitigation strategies. |
| **5. Testing Trophy & Architecture Alignment** | **High** | Plan maps cleanly to the Testing Trophy model (fast unit tests for BPE/AST logic, integration tests for HTTP proxy/SSE, focused CLI/Web E2E tests) and single-responsibility domain boundaries. |

---

## 3. Adversarial Analysis & Critical Observations

During the adversarial audit, several non-blocking edge cases and boundary conditions were identified. These do not invalidate the plan, but they must be explicitly addressed during **Stage 3 (UI/UX Design)** and **Stage 4 (Architecture & Technical Specification)**:

### 3.1 Multimodal & Non-Text Payloads in Proxy Mode
- **Observation**: OpenAI `/v1/chat/completions` increasingly carries multimodal payloads (images via URLs or base64 data, audio clips, file attachments).
- **Audit Directive for Architect**: The proxy and tokenizer must gracefully classify or ignore non-text base64 image blocks, estimating image tokens using the official OpenAI high/low-detail tile formula rather than attempting raw string BPE encoding over megabytes of base64 data.

### 3.2 Monolithic User Query Exceeding Context Ceiling
- **Observation**: User Story 5 (Context Budget Manager) dictates Priority 1 (System Rules) and Priority 2 (User Query) are completely preserved while Priority 4 (History) and Priority 3 (Few-shot) are truncated. However, if a single User Query (e.g. an uploaded 50k-token transcript) alone exceeds the context ceiling (e.g. 8k), the sliding window cannot satisfy the ceiling without truncating Priority 2.
- **Audit Directive for Architect**: The specification must define a deterministic fallback policy for monolithic inputs: either an explicit `BudgetExceededError` or an opt-in semantic head/tail truncation rule with clear warning telemetry.

### 3.3 Client Cancellation & Stream Teardown
- **Observation**: When a client terminates an SSE connection early (e.g., user hits "Stop Generating" in a chat UI), the proxy must not leave the upstream provider connection open or leak sockets.
- **Audit Directive for Architect**: Ensure the HTTP proxy handles `asyncio.CancelledError` / client disconnect events by immediately closing the upstream stream, finalizing partial token accumulation, and freeing resources.

### 3.4 Lightweight Single-Binary UI Packaging
- **Observation**: Non-goal NG-5 bans heavy distributed orchestration. The Web Inspector UI must not introduce a complex multi-process build requirement or node server runtime for end users.
- **Audit Directive for Architect**: Package the Web UI as pre-compiled static assets embedded directly in the server binary/package (e.g., modern vanilla JS/TypeScript or Vite-bundled single-page static distribution served directly by the local HTTP server).

---

## 4. Downstream Directives

### Directives for Stage 3: UI/UX Designer (`features/token-inspector/design.md`)
1. **Token Boundary Highlighting & Contrast**:
   - Ensure alternating token background colors comply with WCAG 2.1 AA contrast requirements against both dark and light terminal/web backgrounds.
   - Design interactive hover cards for individual tokens displaying Token ID, Raw String, Hex/Byte representation, and Logprob/Probability.
2. **Context Window Saturation Visuals**:
   - Create intuitive visual meters (radial gauge and linear progress bar) with dynamic color thresholds: Green (<70%), Yellow (70–90%), Red (>90%), and Over-budget Alert (>100%).
3. **Logprob Heatmap Gradient**:
   - Establish a 3-tier color-coded confidence gradient for sampling inspection ($P > 90\%$ high confidence, $50\% \le P \le 90\%$ moderate confidence, $P < 50\%$ high uncertainty / hallucination risk).
4. **Real-Time Request Feed**:
   - Design an ergonomic two-pane master-detail layout: live request stream on the left (status, latency, prompt tokens, model), full inspection details and token visualizer on the right.

### Directives for Stage 4: Technical Architect (`features/token-inspector/spec.md`)
1. **Domain Isolation**:
   - Enforce the 5 distinct functional domains defined in the plan: Proxy & Interception, Tokenization & Metrics, Context Budget & Truncation, Sampling & Evaluation, Storage & Events.
   - Adhere strictly to the "one file per functionality" rule (e.g., `proxy_service.py`, `sse_streamer.py`, `bpe_encoder.py`, `ast_pruner.py`, `perplexity_calculator.py`).
2. **Deterministic Token Accuracy**:
   - Implement OpenAI chat markup overhead calculation (e.g. 3 tokens per message for `<|im_start|>{role}\n`, 3 tokens for `<|im_start|>assistant\n<|im_end|>`) to achieve 100% token parity with OpenAI official endpoints.
3. **Safe AST-Level JSON Pruning**:
   - Guarantee that truncated JSON contexts never produce syntax errors by pruning at key/array boundaries and verifying output with `json.loads` prior to returning.
4. **Testing Trophy Execution Plan**:
   - **Static/Type**: Ruff + Mypy strict mode.
   - **Unit**: Fast isolated tests for BPE encoding, AST pruning, perplexity formulas.
   - **Integration**: Real HTTP reverse proxy interception, mock upstream SSE stream pass-through.
   - **E2E**: CLI command verification (`inspect`, `benchmark`, `budget`, `compare`, `proxy`).

---

## 5. Next Pipeline Transition

With `PLAN_APPROVED` confirmed, the engineering lifecycle proceeds autonomously:

```text
[Stage 1: Plan] ✅
       │
       ▼
[Stage 2: Plan Review] ✅ (PLAN_APPROVED)
       │
       ▼
[Stage 3: UI/UX Design] ──► Generating features/token-inspector/design.md
```

**Action**: Triggering Stage 3 UI/UX Design (`design-ux`).
