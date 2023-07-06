<template>
  <div>
    Application Index Page: {{ $route.path }}
  </div>
</template>
<script setup>
console.log('process -> client:', process.client);
console.log('process -> server:', process.server);
</script>

<style scoped>

</style>