<template>
  <h1>Enter you name</h1>
  <div>
    {{ firstName }}
    <span style="">
      {{ lastName }}
    </span>
  </div>
  <small>
    <span :class="{
      'selected': !!status,
      'unselected': !status
    }"
    >
    Status:</span>
    <span>{{ status }}</span>
    <div>
      <button 
      @click="onResetClick" 
      :style="{
        visibility: status ? 'visible' : 'hidden'
      }"
      >
      Reset
    </button>
    </div>
  </small>
</template>

<script>
export default {
  name: 'MyName',
  props:{
    status:{
      type: String,
      default: '-'
    }
  },
  emits: ['reset'],
  data: () => ({
    firstName: 'Anastasia',
    lastName: 'Kaneva'
  }),
  methods: {
    onResetClick(){
      console.log('> MyName -> onResetClick');
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>
.selected {
  color: green;
}

.unselected{
  color: red;
}
</style>