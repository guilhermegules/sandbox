"""The loop: evaluate -> reflect -> patch -> repeat.

A loop is the machinery that turns the harness's verdicts into a better model.
It is the engineering pattern behind evals-driven prompt tuning, self-refining
agents, and RAG/RL pipelines alike. The recipe is always the same:

    1. EVALUATE   run the harness against the test set
    2. REFLECT    look only at the failures and diagnose *why*
    3. PATCH      turn the diagnosis into a concrete change to the prompt
    4. REPEAT     re-evaluate, early-stop when accuracy stops improving

Guardrails keep the loop honest: a hard iteration budget and a plateau check
so we never keep patching a model that is not getting better.
"""

from harness import DATASET, Harness
from model import STEPS

STARTING_PROMPT = ["extract", "scale"]
MAX_ATTEMPTS = 5


def reflect(failures, prompt):
    """Diagnose failures: which required reasoning steps is the prompt missing?

    In a real system this is where the LLM is asked to analyze its own wrong
    answers; here we derive the same conclusion directly from the annotations.
    """
    missing = set()
    for f in failures:
        uncovered = set(f["case"].requires) - set(prompt)
        for step in sorted(uncovered):
            missing.add(step)
            print(f"      {f['case'].name}: missing reasoning step >{step}<")
    return missing


def main():
    prompt = list(STARTING_PROMPT)
    print("=== loop engineering: eval -> reflect -> patch -> repeat ===")
    print(f"starting prompt: {prompt}")
    print(f"step library: {sorted(STEPS)}")
    print()

    best_accuracy = 0.0
    total_tokens = 0

    for attempt in range(1, MAX_ATTEMPTS + 1):
        print(f"--- attempt {attempt}/{MAX_ATTEMPTS} (evaluate) ---")
        harness = Harness(prompt)
        report = harness.run(DATASET)
        total_tokens += report["tokens"]
        print()

        if report["accuracy"] == 1.0:
            print("target reached: 100% accuracy. loop converged.")
            break

        # Guardrail 1: plateau detection -- stop if we stopped improving.
        if report["accuracy"] <= best_accuracy and attempt > 1:
            print("guardrail: no improvement since last attempt, stopping early.")
            break
        best_accuracy = report["accuracy"]

        # Guardrail 2: hard budget on iterations.
        if attempt == MAX_ATTEMPTS:
            print(f"guardrail: hit {MAX_ATTEMPTS}-attempt budget.")
            break

        print("--- reflect ---")
        failures = [
            {"name": r["name"], "case": next(c for c in DATASET if c.name == r["name"])}
            for r in report["results"]
            if not r["passed"]
        ]
        missing = reflect(failures, prompt)

        print("--- patch ---")
        patch = sorted(missing)
        prompt = list(dict.fromkeys(prompt + patch))
        print(f"applying patch +{patch} -> new prompt: {prompt}")
        print()

    print()
    print(f"final prompt: {prompt}")
    print(f"final accuracy: {report['accuracy']:.0%} on {report['total']} cases")
    print(f"cumulative eval cost: {total_tokens} tokens")


if __name__ == "__main__":
    main()