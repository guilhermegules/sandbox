<script lang="ts">
import Button from "./components/Button.svelte";
import Calculator from "./components/Calculator.svelte";

</script>

<main>
	<Calculator />
</main>

<style>
  :global(body) {
    background-color: #000;
  }

  :root {
    --background-color: #555;
  }

	main {
		display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
	}
</style>