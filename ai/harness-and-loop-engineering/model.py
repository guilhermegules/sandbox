"""A tiny stand-in for an LLM agent.

We cannot call a real model inside this sandbox, so we simulate one with a
deterministic executor: the "model" runs whatever reasoning steps are listed
in its system prompt. A real harness would point the same `model()` function
at an actual LLM -- the interface is identical.

The point of the stub is to make the failure modes *reproducible*. A real
language model may answer a math word problem wrong on a frustratingly random
basis; this stub answers wrong exactly when its prompt is missing a required
reasoning step. That predictability is what lets us study the loop.
"""


def step_extract(state, msg):
    state["units"] = msg["units"]


def step_scale(state, msg):
    state["result"] = state["units"] * msg["per_unit"]


def step_apply_discount(state, msg):
    threshold = msg.get("threshold", float("inf"))
    if state["result"] > threshold:
        state["result"] = state["result"] * msg.get("discount", 1.0)


def step_subtract_loss(state, msg):
    state["result"] = state["result"] - msg.get("loss", 0)


STEPS = {
    "extract": step_extract,
    "scale": step_scale,
    "discount": step_apply_discount,
    "subtract_loss": step_subtract_loss,
}


def run_steps(prompt, msg):
    """Execute the reasoning steps in `prompt` against message `msg`.

    Returns (state, trace) where trace records each step and the state it
    produced -- this doubles as our token/cost counter for the harness.
    """
    state = {}
    trace = []
    for name in prompt:
        STEPS[name](state, msg)
        trace.append((name, dict(state)))
    return state, trace


def make_model(prompt):
    """A "model" is just a callable wrapping a system prompt."""

    def model(msg):
        return run_steps(prompt, msg)

    model.prompt = prompt
    return model


if __name__ == "__main__":
    model = make_model(["extract", "scale"])
    answer, trace = model({"units": 3, "per_unit": 10})
    print(f"model({'extract,scale'}) on units=3, per_unit=10 -> {answer['result']}")
    print("trace:")
    for name, state in trace:
        print(f"  {name:<10} -> {state}")