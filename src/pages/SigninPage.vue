<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';
import { inject, ref } from 'vue';

const pb = inject(PROVIDE.PB);
const isSucces = ref(false);

const onLogin = (dto) => {
  pb.collection('users').authWithPassword(
    dto.username,
    dto.password
  ).then(() =>{
    isSucces.value = true;
  });
};

</script>
<template>
  <div v-if="!isSucces">
    <RegistrationForm @login="onLogin"/>
    <router-link :to="ROUTES.SIGNUP">
      Sign Up
    </router-link>
  </div>
  <div v-else>
    <div>You have been successfully logged in</div>
    <router-link :to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
</template>