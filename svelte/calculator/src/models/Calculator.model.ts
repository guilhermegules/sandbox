const NO_CLEAR_DISPLAY = false;
const CLEAR_DISPLAY = true;

export default class Calculator {
  #value: string;
  #accumulator: number;
  #clearDisplay: boolean;
  #operation: string;

  constructor(
    value: string = null,
    accumulator: number = null,
    operation: string = null,
    clearDisplay = false
  ) {
    this.#value = value;
    this.#accumulator = accumulator;
    this.#clearDisplay = clearDisplay;
    this.#operation = operation;
  }

  get value() {
    return this.#value?.replace(".", ",") || "0";
  }

  digitedNumber(newValue: string) {
    return new Calculator(
      this.#clearDisplay || !this.#value ? newValue : this.#value + newValue,
      this.#accumulator,
      this.#operation,
      NO_CLEAR_DISPLAY
    );
  }

  digitedDot() {
    return new Calculator(
      this.#value?.includes(".") ? this.#value : this.#value + ".",
      this.#accumulator,
      this.#operation,
      NO_CLEAR_DISPLAY
    );
  }

  clear() {
    return new Calculator();
  }

  digitedOperation(nextOperation: string) {
    return this.calculate(nextOperation);
  }

  calculate(nextOperation: string = null) {
    const accumulator: number = !this.#operation
      ? parseFloat(this.#value)
      : eval(`${this.#accumulator} ${this.#operation} ${this.#value}`);

    const value = !this.#operation ? this.#value : accumulator.toString();

    return new Calculator(
      value,
      accumulator,
      nextOperation,
      nextOperation ? CLEAR_DISPLAY : NO_CLEAR_DISPLAY
    );
  }
}
