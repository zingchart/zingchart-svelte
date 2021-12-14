<!--
  This component is required to test slots, which is not supported by Svelte yet
  https://github.com/testing-library/svelte-testing-library/issues/48
-->
<script>
  import ZingChart from '../ZingChart.svelte';
</script>

<ZingChart {...$$props} />
