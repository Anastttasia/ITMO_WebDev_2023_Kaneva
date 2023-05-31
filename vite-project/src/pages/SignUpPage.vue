<script setup>
import {inject, ref} from 'vue';

import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';

import RegistrationForm from '@/components/RegistrationForm.vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const pb = inject(PROVIDE.PB);
const errors = ref([]);

const onRegister = (dto) => {
  errors.value = [];
  console.log('> SignUpPage - onRegister:', dto);
  if (!dto.password || dto.password.length === 0) {
    errors.value = ['Password required'];
  } else {
    pb.collection('users').create({
      username: dto.username,
      password: dto.password,
      passwordConfirm: dto.password,
    }).then((record) => {
      pb.authStore.save(record.id, record);
      console.log('> SignUpPage - onRegister: result = ', record);
      if (window.confirm(`User created with ID: ${record.id}`)) {
        router.replace({ path: ROUTES.INDEX });
      }
    }).catch((error) => {
      console.log('> SignUpPage - onRegister: error = ', error);
      const errorData = error.data.data;
      for (const item in errorData) {
        const data = errorData[item];
        console.log('> item', data);
        errors.value.push(data.message);
      }
    });
  }
};

</script>
<template>
  <div>
    <RegistrationForm
      :registration="true"
      :errors="errors"
      @register="onRegister"
    />
    <router-link :to="ROUTES.SIGNIN">
      Sign In
    </router-link>
  </div>
</template>