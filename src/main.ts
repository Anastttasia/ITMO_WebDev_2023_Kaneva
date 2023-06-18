import './style.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import router from '@/router';

import AppComposition from './App.vue';
import apolloClient from '@/apollo';
import {DefaultApolloClient} from '@vue/apollo-composable';

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .mount('#app');