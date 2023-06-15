import './style.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';
import router from './router.js';

import AppComposition from './App.vue';
import PROVIDE from '@/constants/provides.js';

const pb = new PocketBase('http://127.0.0.1:5984/');
// const pb = new PocketBase(import.meta.evn.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

// let PouchDB = require('pouchdb');
let db = new PouchDB('http://127.0.0.1:5984/books');
// let db = new PouchDB(`${import.meta.evn.VITE_SERVER_DB_PATH}/books`);

// db.get('book1').then((doc) => {
//   console.log('doc', doc);
// }).catch((e) =>{
//   console.log('get book1 error', e);
// });

// db.changes({
//   since: 'now',
//   live: true,
//   include_docs: ['book1']
// }).on('change', function(change) {
//   // handle change
//   console.log('change', change);
// }).on('complete', function(info) {
//   // changes() was canceled
//   console.log('complete', info);
// }).on('error', function (err) {
//   console.log('on change error', err);
// });

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(PROVIDE.PB, pb)
  .provide(PROVIDE.DB, db)
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .mount('#app');