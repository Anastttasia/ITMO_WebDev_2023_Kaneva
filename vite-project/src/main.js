import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// let response = await fetch('https://fakestoreapi.com/products')

// const PRODUCTS_DATA = await response.json();

// console.log(PRODUCTS_DATA)
// for (let i = 0; i < PRODUCTS_DATA.length; i++) {
//     console.log(PRODUCTS_DATA[i].title);
// }
const response = await fetch('https://fakestoreapi.com/products')
const PRODUCTS_DATA = await response.json();
console.log(PRODUCTS_DATA)


const CHART_DATA = getAllLocalData();

createApp(App).mount('#app')

//let ddd = {};
//
//for (let i = 0; i < 10; i++) {
//    ddd[i] = i + 2;
//}
//console.log(ddd)
//
//for (var key in ddd) {
//    console.log(ddd[key]);
//}

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
    console.log("_addToCart ::: " + index)
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
    console.log(CHART_DATA)
    saveDataLocal()
}

export function _deleteFromCart(index) {
    console.log("_deleteFromCart ::: " + index)
    let item = CHART_DATA[index];
    if (item && item.count == 1) {
        CHART_DATA[index] = null;
    }
    else if (item) {
        item.count = item.count - 1;
    }
    console.log(CHART_DATA)
    saveDataLocal()
}

export function _getCartData(index) {
    return CHART_DATA;
}

export default _addToCart;