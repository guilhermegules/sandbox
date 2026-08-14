<script lang="ts">
  export let value: string;

  $: fontSize = value.length > 20 ? 'small' : `fs-${value.length}`;
</script>

<div class={`display ${fontSize}`}>
  <span>{value}</span>
</div>

<style>
  .display {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5px;
    background-color: aliceblue;
    overflow: hidden;
    font-size: 1.6rem;
    margin: 2px 1px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .fs-10 {
    font-size: 1.5rem;
  }

  .fs-11 {
    font-size: 1.35rem;
  }

  .fs-12 {
    font-size: 1.25rem;
  }

  .fs-13 {
    font-size: 1.15rem;
  }

  .fs-14 {
    font-size: 1.05rem;
  }

  .fs-15 {
    font-size: 1rem;
  }

  .fs-16 {
    font-size: 0.93rem;
  }

  .fs-17 {
    font-size: 0.87rem;
  }

  .fs-18 {
    font-size: 0.83rem;
  }

  .fs-19 {
    font-size: 0.78rem;
  }

  .fs-20 {
    font-size: 0.74rem;
  }

  .small {
    font-size: 0.6rem;
  }
</style>