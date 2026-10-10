# Harness & Loop Engineering Quiz

## Key Terms

| Term | What people say | What it actually means |
|------|----------------|----------------------|
| Harness | "The test runner" | The objective judge that scores model completions against golden answers |
| Test case | "A question" | An input + expected output pair, usually harvested from real traffic |
| Golden answer | "The right answer" | The reference output a correct model must produce |
| Accuracy | "How good it is" | Percent of test cases the model gets right -- one axis of a report |
| Failure analysis | "What went wrong?" | Reading only the wrong answers to diagnose the missing capability |
| Patch | "Fix the prompt" | A concrete prompt/code change driven by a diagnosed failure |
| Loop | "Iterate until it works" | evaluate -> reflect -> patch -> repeat |
| Iteration budget | "Stop at some point" | Hard cap on loop attempts, so it cannot run forever |
| Plateau detection | "It's not improving" | Guardrail that stops the loop when accuracy stops rising |
| Regression | "Broken again" | A previously passing case the latest patch made fail |

## Pre-Test

1. **What is the single most important job of an evaluation harness?**
   - A) To make the model run faster
   - B) To objectively score model outputs against expected answers
   - C) To generate training data
   - D) To deploy the model
   - **Correct answer: B**

2. **Where should the test cases in a harness come from?**
   - A) Randomly generated math problems
   - B) The model's favorite prompts
   - C) Real user traffic and known failure reports
   - D) Only from textbooks
   - **Correct answer: C**

## Post-Test

3. **A model with brand-new prompt achieves 4/5 accuracy; the old prompt got 5/5. What does the harness tell you?**
   - A) The new prompt is faster, ship it
   - B) The new prompt regressed on at least one case -- investigate before shipping
   - C) The test set is too small
   - D) Accuracy does not matter
   - **Correct answer: B**

4. **In the loop, what is the ONLY input a patch is allowed to be based on?**
   - A) The model's architecture
   - B) A diagnosed failure from the failure analysis step
   - C) A gut feeling that the prompt looks nicer
   - D) The training budget
   - **Correct answer: B**

5. **Why does the loop need a plateau detection guardrail?**
   - A) To save money when iteration stops producing improvement
   - B) To make the loop exit after exactly two tries
   - C) To prevent the model from memorizing the test set
   - D) To force the harness to re-score
   - **Correct answer: A**

6. **Starting from prompt `[extract, scale]`, why did the loop add `discount` and `subtract_loss`?**
   - A) Because those steps exist in the step library
   - B) Because failure analysis showed cases `order-with-discount` and `shipment-with-loss` were missing those reasoning steps
   - C) Because longer prompts are always better
   - D) Because the iteration budget demanded a patch
   - **Correct answer: B**