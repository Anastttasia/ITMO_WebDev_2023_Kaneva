<template>
  <div>
    Application Index Page: {{ $route.path }}
    isDataLoading: {{ isDataLoading }}
    {{ isDataLoading ? '' : books }}
  </div>
</template>
<script setup>
console.log('process -> client:', process.client);
console.log('process -> server:', process.server);
const { data: books, pending: isDataLoading } = await useFetch('/api/books', { server: false });
</script>

<style scoped>

</style>