<script lang="ts">
  export let text = '';
  export let hasThreeRows = false;
  export let hasTwoRows = false;
  export let isOperator = false;
  export let hasContrast = false;
  export let onClick: (value: string) => void = () => {}
</script>

<button 
  class="button" 
  class:button-col-3={hasThreeRows} 
  class:button-col-2={hasTwoRows} 
  class:is-operator={isOperator} 
  class:has-contrast={hasContrast}
  on:click="{() => onClick(text)}"
>
  {text}
</button>

<style>
  .button {
    flex-basis: 25%;
    margin: 0;
    border: 1px solid var(--background-color);
  }

  .button-col-3 {
    flex-basis: 75%;
  }

  .button-col-2 {
    flex-basis: 50%;
  }

  .is-operator {
    background-color: orange;
    color: white;
  }

  .has-contrast {
    background-color: red;
    color: white;
  }
</style>