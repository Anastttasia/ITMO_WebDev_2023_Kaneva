<script setup>
import { computed, ref, watch } from 'vue';
import {parseLocalStorage, saveToLocalStorage} from '../utils/storageUtils.js';
import TodoItem from './TodoItem.vue';

const LOCAL_KEY_TODOS = 'todos';
const LOCAL_KEY_INPUT_TEXT = 'input_text';

const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));
const todos = ref(parseLocalStorage(LOCAL_KEY_TODOS, []));
//console.log(typeof(todos));
console.log(typeof(todos.value));

const canAddItemToTodoList = computed(() => true);
const getTodoCount = computed(() => todos.value?.length);
const getTodoText = computed(() => inputText.value?.trim());

//localStorage.clear();

const onInputEnterKeyUp = () => {
  console.log('> TodosPage -> onInputEnterKeyUp', getTodoText.value);
  todos.value.push(getTodoText.value);
  inputText.value = '';
};

const onDeleteTodo = (index) => {
  console.log('> TodosPage -> onDeleteTodo: index =', index);
  todos.value.splice(index, 1);
};

watch(inputText, (value) => saveToLocalStorage(LOCAL_KEY_TODOS, value));
watch(todos, (value) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, value), {deep: true});
</script>

<template>
  <input 
    ref="domInput"
    v-model="inputText"
    @keyup.enter="canAddItemToTodoList && onInputEnterKeyUp()"
  >
  <div>
    List: (
    <span v-if="todos.length ">
      {{ getTodoCount }}
    </span>
    <span v-else>empty</span>)
    <template
      v-for="(item, index) in todos" 
      :key="item"
    >
      <TodoItem
        :index="index + 1"
        :text="item"
        @delete="onDeleteTodo(index)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'TodosPage'
};
</script>