<script>
import { useRoute } from "vue-router";

import * as myModule from '../main.js';
export default {
    data() {
        return {
            count: 0,
            id: 0,
            price: 0,
            title: '',
            description: '',
            image: '',
        };
    },
    emits: ['card-update'],
    methods: {
        addToCart() {
            myModule._addToCart(this.id)
            this.$emit('updateTotal');
            this.count = this.count + 1;
        },
        deleteFromCart() {
            myModule._deleteFromCart(this.id)
            this.$emit('updateTotal');
            this.count = this.count - 1;
        }
    },

    mounted() {
        let cartData = myModule._getCartData();
        let rawRardData = myModule._getRawData();

        this.id = useRoute().params.id;

        let index = this.id - 1;
        this.price = rawRardData[index].price;
        this.title = rawRardData[index].title;
        this.description = rawRardData[index].description;
        this.image = rawRardData[index].image;
        this.count = 0;

        if (cartData[this.id]) {
            this.count = cartData[this.id].count;
        }

    }
}


</script>

<template>
    <div class="pageCard">
        <div class="descriptionCard">
            <router-link :to="{ name: 'list'}"> <button class="btnBack">Back</button> </router-link>
            <h1 class="name">Пользователь ID {{ id }}</h1>
            <h3 class="name">{{ title }}</h3>
            <h4 class="price">{{ price }}</h4>
            <p class="description">{{ description }}</p>
            <div class="btnBlock">
                <button class="buttonBin" v-on:click="deleteFromCart()" v-if="count > 0"><img src="../image/icon/delete.png" style="width: 15px; height: 15px;"></button>
                <button class="button" v-on:click="addToCart()">Add<span v-if="count > 0"> ({{count}})</span></button>
            </div>
        </div>
        <div class="containerImg"><img :src="image" class="image"></div>
    </div>
</template>

<style>
.btnBack {
    width: 3rem;
    color: rgb(0, 174, 255);
    font-size: small;
    border: 1px solid rgba(0, 174, 255, 0.548);
    border-radius: 3px;

}

.btnBack:hover {
    background-color: rgba(0, 174, 255, 0.171);
}

.pageCard {
    display: flex;
    flex-direction: row;
    margin: 2rem 2rem 0 2rem;
}

.descriptionCard {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 4px 0 4px;
}

.name {
    font-weight: 700;
    font-size: 20px;
    color: rgba(43, 41, 41, 0.658);
    margin-top: 1rem;
}

.price {
    color: black;
    font-weight: 600;
    font-size: 20px;
    margin: 1rem 0 1rem 0;
}

.description {
    font-size: 12px;
    color: rgba(43, 41, 41, 0.658);
}

.btnBlock{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem ;
    align-items: center;
    justify-content:center;
}
.buttonBin{
    width: 40px;
    height: 35px;
    border-radius: 5px;
    background-color: rgba(199, 42, 14, 0.226);
    display: flex;
    align-items: center;
    justify-content:center;
    margin: 1rem 1rem 0 4px ;
}
.button{
    width: 100%;
    height: 35px;
    font-size: small;
    border: 1px solid rgb(125, 199, 14);
    border-radius: 5px;
    background-color: transparent;
    color: rgb(125, 199, 14);
    margin-top: 1rem;
}
.button:hover{
    background-color: rgba(125, 199, 14, 0.171);
}

@media (max-width: 640px) {
    .pageCard {
        flex-direction: column;
        margin: 2rem 0.5rem 0 0.5rem;
    }
}
</style>