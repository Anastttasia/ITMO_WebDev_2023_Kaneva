<script setup>
import {inject, isReadonly, onMounted, ref} from 'vue';
import PROVIDE from '@/constants/provides.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const domInputFile = ref(null);
const domBtnUpload = ref(null);

const isReady = ref(false);
const isUpLoading = ref(false);
const isBooksLoading = ref(false);

const BOOKS_ITEMS_PER_PAGE = 10;

const books = ref([]);
const pageIndex = ref(parseInt(router.currentRoute.value.query.page) || 1);
const pagesMax = ref(0);

const pb = inject(PROVIDE.PB);
const db = inject(PROVIDE.DB);

const booksCollection = pb.collection('books');

const loadBook = async () => {
  isBooksLoading.value = true;
  return db.allDocs({include_docs: true, limit: BOOKS_ITEMS_PER_PAGE, scip: (pageIndex.value - 1) * BOOKS_ITEMS_PER_PAGE}).then((result) => {
    console.log('> BooksPage -> loadBooks: result =', result);

    pagesMax.value = Math.ceil(result.total_rows / BOOKS_ITEMS_PER_PAGE);
    books.value = result.rows.map(item => item.doc);
    isBooksLoading.value = false;
  }).catch((e) =>{
    console.log('> BooksPage -> loadBooks: error =', e);
  });

  // return booksCollection.getList(pageIndex.value, 10).then((result) =>{
  //   console.log('booksCollection: ', booksCollection);
  //   console.log('> result:', result);
  //   pagesMax.value = result.totalPages;
  //   books.value = result.items;
  //   isBooksLoading.value = false;
  // });
};
console.log('booksCollection: ', booksCollection);

const insertBooks = async (booksList) => {
  return db.bulkDocs(booksList, {include_docs: true}).then((results) => {
    console.log('insertBooks -> results:', results);
  }).catch(e => {
    console.log('insertBooks -> e:', e);
  });
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
        await insertBooks(booksRaw);
      } catch (e) {
        console.log(e);
      }
      setActiveUploadUI(true);
      reader.onload = null;
      domInputFile.value.oninput  = null;
      await loadBook();
    };
    reader.readAsText(selectedFile);
  };
  domInputFile.value.click();
};

const onChangPage = (delta) =>{
  console.log('BooksPage --> onChangPage:', {delta});
  pageIndex.value += delta;
  loadBook().then(() => {
    router.replace({ query: {page: pageIndex.value}
    });
  });
};

onMounted(()=>{
  Promise.all([
    loadBook()
  ]).then(() => {
    isReady.value = true;
  });
});

</script>
<template>
  <div v-if="!isReady">
    Page loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <button 
        :disabled="pageIndex === 1"
        @click="onChangPage(-1)"
      >
        Prev
      </button>
      <button
        :disabled="pageIndex === pagesMax"
        @click="onChangPage(1)"
      >
        Next
      </button>
      <div>
        <b>Books ({{ pageIndex}} / {{ pagesMax }}):</b>
        <div 
          v-for="book in books" 
          :key="book.id"
        >
          {{ book.title }}
        </div>
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
