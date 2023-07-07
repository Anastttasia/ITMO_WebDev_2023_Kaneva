<script setup>
import Header from './components/Header.vue'
import ProductList from './pages/productList.vue';
import PageCard from './pages/pageCard.vue';
import Bascet from './pages/cardBasket.vue'

</script>

<template>
    <Header></Header>
    <div class="container">
        <ProductList></ProductList>
    </div>

</template>

<style scoped>
    .container{
        max-width: 100%;
    }
</style>
