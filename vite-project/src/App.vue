<script setup>
import MyName from './components/MyName.vue';
</script>

<template>
  <select name="status" 
  @change="onSelectChenge"
  >
    <option v-if="!status" 
    value="unselected" 
    selected>
      Unselected
    </option>
    <option v-for="item in statusList" 
    :key="item" 
    :value="item" 
    :selected="item === status">
      {{ item }}
    </option>
  </select>
  <MyName 
  :status="status" 
  @reset="onStatusReset"/>
</template>

<script>
export default {
  data: () => ({
    statusList: ['Ready', 'Start', 'Stop'],
    status: 'Loading'
  }),
  methods: {
    onSelectChenge(event) {
      console.log('> App -> onSelectChenge', event.target.value);
      this.status = event.target.value;
    },
    onStatusReset(){
      console.log('> App -> onStatusReset');
      this.status = null;
    }
  }
};
</script>

<style scoped></style>
