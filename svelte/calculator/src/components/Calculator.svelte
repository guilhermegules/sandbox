<script lang="ts">
  
  import Calculator from "../models/Calculator.model";
  import Button from "./Button.svelte";
  import Display from "./Display.svelte";
  import Row from "./Row.svelte";

  let calculator = new Calculator();
  
  const digitedNumber = (number: string) => calculator = calculator.digitedNumber(number);
  const digitedDot = () => calculator = calculator.digitedDot();
  const clear = () => calculator = calculator.clear();
  const digitedOperation = (operator: string) => calculator = calculator.digitedOperation(operator);
  const calculate = () => calculator = calculator.calculate();

</script>

<div class="calculator">
  <Display value={calculator.value} />
  <Row>
    <Button text="AC" hasThreeRows hasContrast onClick={clear} />
    <Button text="/" isOperator onClick={digitedOperation}/>
  </Row>
  <Row>
    <Button text="7" onClick={digitedNumber}/>
    <Button text="8" onClick={digitedNumber}/>
    <Button text="9" onClick={digitedNumber}/>
    <Button text="*" isOperator onClick={digitedOperation}/>
  </Row>
  <Row>
    <Button text="4" onClick={digitedNumber}/>
    <Button text="5" onClick={digitedNumber}/>
    <Button text="6" onClick={digitedNumber}/>
    <Button text="+" isOperator onClick={digitedOperation}/>
  </Row>
  <Row>
    <Button text="1" onClick={digitedNumber}/>
    <Button text="2" onClick={digitedNumber}/>
    <Button text="3" onClick={digitedNumber}/>
    <Button text="-" isOperator onClick={digitedOperation}/>
  </Row>
  <Row>
    <Button hasTwoRows text="0" onClick={digitedNumber}/>
    <Button text="," onClick={digitedDot}/>
    <Button text="=" hasContrast onClick={calculate}/>
  </Row>
</div>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    height: 220px;
    width: 150px;
    padding: 10px;
    border-radius: 10px;

    background-color: var(--background-color);
  }
</style>