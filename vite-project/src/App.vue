<template>
  <h3>Todo List</h3>
  <input 
  v-model="inputText"
  @keyup.enter="canAddItemToTodoTheList && onInputEnterKeyUp()"
  >
  <div>
    List:
    <div 
    v-for="item in todos" 
    :key="item"
    >
    {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    inputText: '',
    todos: []
  }),
  computed:{
    canAddItemToTodoTheList(){
      console.log('> App -> canAddItemToTodoTheList');
      return this.todoText?.length > 0;
    },
    todoText(){return this.inputText?.trim(); }
  },
  methods: {
    onInputEnterKeyUp(event) {
      console.log('> App -> onInputEnterKeyUp');
      this.todos.push(this.inputText.trim());
      this.inputText = '';
    }
  }
};
</script>

<style scoped></style>
