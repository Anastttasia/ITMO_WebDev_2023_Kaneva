<script setup>
import {inject, ref} from 'vue';
import PROVIDE from '@/constants/provides.js';

const domInputFile = ref(null);
const domBtnUpload = ref(null);
const isUpLoading = ref(null);
const isPreparing = ref(false);
const books =ref([]);

const pb = inject(PROVIDE.PB);
const booksCollection = pb.collection('books');

booksCollection.getList(1, 50).then((result) =>{
  console.log('> result:', result);
  books.value = result.items;
  isPreparing.value = false;
});

const insertBooks = async (booksList) => {
  const result =[];
  for await (const booksListElement of booksList) {
    await booksCollection.create(booksListElement).then((record) => {
      console.log('> \t record created:', record);
      result.push(record);
    }).catch((e) => console.log(e));
  }
  return result;
};

const onUploadClick = () => {
  console.log('> BooksPage -> onUploadClick:', domInputFile.value);
  const setActiveUploadUI = (value, negativeValue = !value) => {
    domBtnUpload.value.disabled = negativeValue;
    domInputFile.value.disabled = negativeValue;
    isUpLoading.value = negativeValue;
  };

  domInputFile.value.oninput = () => {
    const fileList = domInputFile.value.files;
    const selectedFile = fileList[0];
    const reader = new FileReader();
    console.log('> \t files', fileList);
    console.log('> \t selectedFile:', selectedFile);
    setActiveUploadUI(false);

    reader.onload = async () => {
      const booksRaw = JSON.parse(reader.result.toString());
      console.log('selectedFile:', booksRaw);
      try {
        const booksInserted = await insertBooks(booksRaw.slice(0, 2));
        console.log('inserted:', booksInserted);
        books.value = booksInserted;
      } catch (e) {
        console.log(e);
      }
      setActiveUploadUI(true);
      reader.onload = null;
      domInputFile.value.oninput  = null;
    };
    reader.readAsText(selectedFile);
  };
  domInputFile.value.click();
};

</script>
<template>
  <div v-if="isPreparing">
    Page loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      Books
      <div 
        v-for="book in books" 
        :key="book.id"
      >
        {{ book.title }}
      </div>
    </div>
    <div v-else>
      <input 
        ref="domInputFile" 
        hidden 
        type="file" 
        accept=".json"
      >
      <button 
        ref="domBtnUpload"
        @click="onUploadClick"
      >
        Upload
      </button>
      <div v-if="isUpLoading">
        In progess, wait please ...
      </div>
    </div>
  </div>
</template>
