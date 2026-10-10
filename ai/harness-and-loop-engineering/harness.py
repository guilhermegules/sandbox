"""The evaluation harness: datasets, scoring, and reports.

A harness is the objective judge that measures whether a model actually works.
It is the ground truth of any AI engineering effort -- if you cannot score a
completion, you cannot improve it. Every loop in loop.py exists only to move
the numbers that this file produces.

Each test case declares `requires`, the reasoning steps its correct answer
depends on. The golden answer is computed by executing exactly those steps, so
the expected values are never hand-typed magic numbers.
"""

from model import make_model, run_steps


class Case:
    def __init__(self, name, message, requires):
        self.name = name
        self.message = message
        self.requires = requires
        self.expected = run_steps(requires, message)[0]["result"]

    def __repr__(self):
        return f"Case({self.name!r}, msg={self.message}, requires={self.requires})"


DATASET = [
    Case(
        "order-no-discount",
        {"units": 3, "per_unit": 10, "threshold": 10_000},
        requires=["extract", "scale"],
    ),
    Case(
        "order-with-discount",
        {"units": 20, "per_unit": 10, "threshold": 100, "discount": 0.9},
        requires=["extract", "scale", "discount"],
    ),
    Case(
        "shipment-with-loss",
        {"units": 5, "per_unit": 8, "threshold": 10_000, "loss": 6},
        requires=["extract", "scale", "subtract_loss"],
    ),
]


class Harness:
    """Runs a model's system prompt over the dataset and scores every case."""

    def __init__(self, prompt):
        self.prompt = prompt
        self.model = make_model(prompt)

    def eval_one(self, case):
        answer, trace = self.model(case.message)
        pred = answer.get("result")
        passed = pred is not None and abs(pred - case.expected) < 1e-6
        return {
            "name": case.name,
            "expected": case.expected,
            "predicted": pred,
            "passed": passed,
            "tokens": len(trace),
            "trace": [name for name, _ in trace],
        }

    def run(self, cases, verbose=True):
        results = [self.eval_one(c) for c in cases]
        passed = sum(1 for r in results if r["passed"])
        summary = {
            "names": [r["name"] for r in results],
            "results": results,
            "accuracy": passed / len(cases),
            "passed": passed,
            "total": len(cases),
            "tokens": sum(r["tokens"] for r in results),
            "prompt": self.prompt,
        }
        if verbose:
            print("  " + "-" * 66)
            print(f"  prompt: {self.prompt}")
            print("  " + "-" * 66)
            for r in results:
                mark = "PASS" if r["passed"] else "FAIL"
                print(
                    f"  [{mark}] {r['name']:<24} "
                    f"expected={r['expected']:<6} predicted={r['predicted']}"
                )
            print("  " + "-" * 66)
            print(
                f"  accuracy = {summary['accuracy']:.0%} "
                f"({passed}/{len(cases)})  cost = {summary['tokens']} tokens"
            )
        return summary


if __name__ == "__main__":
    harness = Harness(["extract", "scale"])
    harness.run(DATASET)