from typing import Any, Dict, List, Optional
import asyncio
import httpx

from token_inspector.models.sampling_schemas import (
    DivergencePoint,
    EvaluatedToken,
    SamplingMatrixConfig,
    SamplingMatrixReport,
    SamplingTrialResult,
)
from token_inspector.sampling.divergence_detector import DivergenceDetector
from token_inspector.sampling.logprob_evaluator import LogprobEvaluator
from token_inspector.sampling.perplexity_calculator import PerplexityCalculator


class MatrixRunner:
    """Executes concurrent prompt sampling matrices across temperatures and top_p values with logprob evaluation."""

    def __init__(
        self,
        client: Optional[httpx.AsyncClient] = None,
        base_url: str = "https://api.openai.com/v1",
        api_key: Optional[str] = None,
        evaluator: Optional[LogprobEvaluator] = None,
        perplexity_calc: Optional[PerplexityCalculator] = None,
        divergence_detector: Optional[DivergenceDetector] = None,
    ) -> None:
        self.client = client
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.evaluator = evaluator or LogprobEvaluator()
        self.perplexity_calc = perplexity_calc or PerplexityCalculator()
        self.divergence_detector = divergence_detector or DivergenceDetector()

    async def _execute_trial(
        self,
        prompt: str,
        temperature: float,
        top_p: float,
        config: SamplingMatrixConfig,
        client: httpx.AsyncClient,
        semaphore: asyncio.Semaphore,
    ) -> SamplingTrialResult:
        payload = {
            "model": config.model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "top_p": top_p,
            "max_tokens": config.max_tokens,
            "logprobs": True,
            "top_logprobs": 3,
        }

        headers: Dict[str, str] = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        trial_id = f"trial_t{temperature}_p{top_p}"

        async with semaphore:
            max_retries = 3
            backoff = 0.05

            for attempt in range(max_retries + 1):
                url = f"{self.base_url}/chat/completions"
                response = await client.post(url, json=payload, headers=headers)

                if response.status_code == 429:
                    retry_after = float(response.headers.get("Retry-After", backoff))
                    await asyncio.sleep(retry_after)
                    backoff *= 2
                    continue

                response.raise_for_status()
                data = response.json()
                break

        choices = data.get("choices", [])
        output_text = ""
        evaluated_tokens: List[EvaluatedToken] = []
        logprobs_list: List[float] = []

        if choices:
            choice = choices[0]
            output_text = choice.get("message", {}).get("content", "")
            logprobs_info = choice.get("logprobs") or {}
            raw_content = logprobs_info.get("content", [])
            evaluated_tokens = self.evaluator.evaluate_tokens(raw_content)
            logprobs_list = [t.logprob for t in evaluated_tokens]

        ppl = self.perplexity_calc.calculate_perplexity(logprobs_list)
        avg_conf = self.perplexity_calc.calculate_average_confidence(logprobs_list)

        return SamplingTrialResult(
            trial_id=trial_id,
            temperature=temperature,
            top_p=top_p,
            output_text=output_text,
            tokens=evaluated_tokens,
            perplexity=round(ppl, 4),
            average_confidence_pct=round(avg_conf, 2),
            divergence_token_index=None,
        )

    async def run_matrix(
        self,
        prompt: str,
        config: Optional[SamplingMatrixConfig] = None,
    ) -> SamplingMatrixReport:
        cfg = config or SamplingMatrixConfig()
        semaphore = asyncio.Semaphore(cfg.concurrency_limit)

        owns_client = False
        client = self.client
        if client is None:
            client = httpx.AsyncClient()
            owns_client = True

        try:
            tasks = [
                self._execute_trial(
                    prompt=prompt,
                    temperature=t,
                    top_p=p,
                    config=cfg,
                    client=client,
                    semaphore=semaphore,
                )
                for t in cfg.temperatures
                for p in cfg.top_ps
            ]

            trials: List[SamplingTrialResult] = await asyncio.gather(*tasks)
        finally:
            if owns_client:
                await client.aclose()

        divergence_points: List[DivergencePoint] = []
        if trials:
            # Baseline is lowest temperature trial
            baseline = min(trials, key=lambda tr: (tr.temperature, tr.top_p))

            for trial in trials:
                if trial.trial_id == baseline.trial_id:
                    continue
                div = self.divergence_detector.find_divergence(
                    baseline=baseline.tokens, trial=trial.tokens
                )
                if div:
                    trial.divergence_token_index = div.token_index
                    divergence_points.append(div)

        return SamplingMatrixReport(
            prompt=prompt,
            model=cfg.model,
            trials=trials,
            divergence_points=divergence_points,
        )
