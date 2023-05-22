<script setup>
import { onMounted, ref } from 'vue';
import AppHeader from './components/AppHeader.vue';


const PAGES = ['index', 'todos'];
const user = ref({name: 'Anastasia'});
const currentPage = ref(PAGES[0]);
// const header = ref(null);

const onChangePsge = (pageName) => {
  console.log('> AppComposition -> onChangePsge');
  currentPage.value = pageName;
};

onMounted(() => {
  console.log('> AppComposition -> onMounted');
});
</script>

<template>
  <AppHeader ref="header">
    Todo App
    <template #sub-header>
      <span v-if="user">created by {{ user.name }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <div>
    <router-link to="/">
      Index
    </router-link>
    <router-link to="/todos">
      Todos
    </router-link>
  </div>
  <router-view />
</template>
