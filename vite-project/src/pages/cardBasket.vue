<script>
import * as myModule from '../main.js';
import tamplateBasketCard from '../components/templateBasketCard.vue';


export default {
    data() {
        return {
            products: [],
        };
    },
    components: { tamplateBasketCard },
    emits: ['updateTotal'],
    methods: {
        update() {
            this.$emit('updateTotal');
            this.$forceUpdate();
        },
    },

    mounted() {
        this.products = myModule._getCartData();
    }
}
</script>

<template>
    <router-link :to="{ name: 'list'}"> <button class="btnBack">Back</button> </router-link>
    <tamplateBasketCard 
        v-for="item in products" 
        :key="item.itemData.id"
        :image= item.itemData.image
        :title="item.itemData.title"
        :price="item.itemData.price"
        :description="item.itemData.description"
        :id="item.itemData.id"
        v-on:card-update="update()"
      ></tamplateBasketCard>
</template>

<style>
</style>