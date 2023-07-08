<script>

import * as myModule from '../main.js';
export default {
    props: ['title', 'price', 'description', 'image', 'id'],
    data() {
        return {
            count: 0
        };
    },
    emits: ['card-update'],
    methods: {
        addToCart() {
            myModule._addToCart(this.id)
            this.$emit('card-update');
            this.count = this.count + 1;
        },
        deleteFromCart() {
            myModule._deleteFromCart(this.id)
            this.$emit('card-update');
            this.count = this.count - 1;
        }
    },
    mounted() {
        let cartData = myModule._getCartData();
        if (cartData[this.id]) {
            this.count = cartData[this.id].count
        }
    }
}
</script>

<template>
    <div class="card" :id="id">
        <div class="container">
            <router-link :to="{ name: 'card', params: { id: this.id } }">
                <div class="containerImg"><img :src="image" class="image"></div>
                <div class="descriptionBlock">
                    <h3 class="name">{{ title }}</h3>
                    <h4 class="price"><p>$</p>{{ price }}</h4>
                    <p class="description">{{ description }}</p>
                </div>
            </router-link>
        </div>
        <div class="btnBlock">
            <button class="buttonBin" v-on:click="deleteFromCart()" v-if="count > 0"><img src="../image/icon/delete.png" style="width: 15px; height: 15px;"></button>
            <button class="button" v-on:click="addToCart()">Add<span v-if="count > 0"> ({{count}})</span></button>
        </div>
    </div>
</template>

<style scoped>
   .card{
        background-color: rgb(224, 222, 222);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        color: black;
        padding: 5px 5px 0.5rem 5px;
   }
    .containerImg{
        background-color: white;
        padding: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }
    .image{
        width: 120px;
        height: 150px;
    }
    .descriptionBlock{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding: 0 4px 0 4px;
    }
    .name{
        font-weight: 700;
        font-size: 18px;
        color: rgba(43, 41, 41, 0.658);
    }
    .price{
        display: flex;
        flex-direction: row;
    }
    .description{
        font-size: 12px;
        color: rgba(43, 41, 41, 0.658);
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
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
</style>