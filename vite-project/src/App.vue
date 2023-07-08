<script>
import Header from './components/Header.vue'
import ProductList from './pages/productList.vue';
import PageCard from './pages/pageCard.vue';
import Bascet from './pages/cardBasket.vue'

import * as myModule from './main.js';

export default {

    data() {
        return {
            total: 0,
            itemsCount: 0
        };
    },
    components: { Header, ProductList },
    methods: {
        updateCart() {
            let cartData = myModule._getCartData()
            
            let counterTotal = 0;
            let itemsCount = 0;
            for (let key in cartData) {
                if (cartData[key]) {
                    counterTotal = counterTotal + Number(cartData[key].itemData.price * cartData[key].count);
                    itemsCount = itemsCount + cartData[key].count;
                }
            }
            
            this.total = Math.ceil(counterTotal);
            this.itemsCount = itemsCount;
        },
        updateItemsCount() {

        },
    },
    mounted() {
        this.updateCart();
    }
};
</script>

<template>
    <Header :total="total" :itemsCount="itemsCount"></Header>
    <div class="container">
        <ProductList
            v-on:updateTotal="updateCart()"
        >
        </ProductList>
    </div>

</template>

<style scoped>
    .container{
        max-width: 100%;
    }
</style>
