<script setup lang="ts">
import {computed, reactive} from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppMenu from '@/components/AppMenu.vue';
import ROUTES from '@/constants/routes.js';
import {useRoute} from 'vue-router';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import {useUserStore} from '@/store/userStore';
import {storeToRefs} from 'pinia';

const userStore = useUserStore();
const { user, hasUser } = storeToRefs(userStore);

const { result: usersData, loading: isUserLoading } = useQuery(gql`
  query getUsers {
    user {
      id
      name
    }
  }
`);

const checkRouteIsNotCurrent = (routePath: string) => useRoute().path !== routePath;

const menuLinks = reactive([
  { name: 'Index', link: ROUTES.INDEX, canRender: computed(() => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  { name: 'Books', link: ROUTES.BOOKS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS)) },
  { name: 'Sign In', link: ROUTES.SIGNIN, canRender: computed(() => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: 'Sign Out', link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick: () => {
    console.log('SignOUT');

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
      {{ usersData.user }}
    </div>
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.name }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <AppMenu
    style="margin: 2rem 0;"
    :links="menuLinks"
  />
  <router-view />
</template>