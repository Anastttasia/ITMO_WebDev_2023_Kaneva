<script setup>
import {computed, inject, onMounted, reactive, ref} from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppMenu from '@/components/AppMenu.vue';
import PROVIDE from '@/constants/provides.js';
import ROUTES from '@/constants/routes.js';
import {useRoute} from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const pb = inject(PROVIDE.PB);
const user = ref(pb.authStore.model);
pb.authStore.onChange(() => {
  console.log('> App -> authStore.onChange', pb.authStore.onChange.model);
  user.value = pb.authStore.model;
});
const hasUser = computed(() => !!user.value);

// pb.authStore.clear();

const checkRouteIsNotCurrent = (routePath) => useRoute().path !== routePath;

const { result: usersData, loading: isUserLoading } = useQuery(gql`
  query getUsers {
    user {
      id
      name
    }
  }
`);

const menuLinks = reactive([
  { name: 'Index', link: ROUTES.INDEX, canRender: computed(() => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  { name: 'Todos', link: ROUTES.TODOS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.TODOS)) },
  { name: 'Books', link: ROUTES.BOOKS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS)) },
  { name: 'Sign In', link: ROUTES.SIGNIN, canRender: computed(() => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: 'Sign Out', link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick: () => {
    console.log('SignOUT');
    pb.authStore.clear();
  } },
]);

</script>
<template>
  <AppHeader>
    Todo App
    <div v-if="isUserLoading">
      Users Loading
    </div>
    <div v-else>
      Find users: {{ usersData.user }}
    </div>
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.username }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <AppMenu
    style="margin: 2rem 0;"
    :links="menuLinks"
  />
  <router-view />
</template>