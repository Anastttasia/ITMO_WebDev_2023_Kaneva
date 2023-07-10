
import './style.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from './pages/productList.vue';
import PageCard from './pages/pageCard.vue';
import Basket from './pages/cardBasket.vue'
import App from './App.vue'

const response = await fetch('https://fakestoreapi.com/products')
const PRODUCTS_DATA = await response.json();

const router = createRouter({
    routes: [
        {
            path: '/card/:id',
            name: 'card',
            component: PageCard,
        },
        {
            path: '/basket',
            name: 'basket',
            component: Basket,
        },
        {
            path: '/',
            name: 'list',
            component: ProductList
        }
    ],
    history: createWebHistory()
  })

const CHART_DATA = getAllLocalData();

const app = createApp(App);
app.use(router);
app.mount('#app');

function saveDataLocal() {
    localStorage.setItem("cartData", JSON.stringify(CHART_DATA));
}

function getAllLocalData() {
    let data = JSON.parse(localStorage.getItem('cartData'));
    if (data == null) {
        data = {};
    }
    return data;
}

export function _addToCart(index) {
    let item = CHART_DATA[index];
    if (item) {
        item.count = item.count + 1;
    }
    else {
        CHART_DATA[index] = {
            itemData: PRODUCTS_DATA[index - 1],
            count: 1
        }
    }
    saveDataLocal()
}

export function _deleteFromCart(index) {
    let item = CHART_DATA[index];
    if (item && item.count == 1) {
        delete CHART_DATA[index];
    }
    else if (item) {
        item.count = item.count - 1;
    }
    saveDataLocal()
}

export function _getCartData(index) {
    return CHART_DATA;
}

export function _getRawData(index) {
    return PRODUCTS_DATA;
}

export default _addToCart;