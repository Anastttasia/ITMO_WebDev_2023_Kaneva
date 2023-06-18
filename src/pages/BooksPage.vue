<script setup lang="ts">
import {inject, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

import PROVIDE from '@/constants/provides.js';

const router = useRouter();

const domInputFile = ref(null);
const domBtnUpload = ref(null);

const isReady = ref(false);
const isUploading = ref(false);
const isBooksLoading = ref(false);

const BOOKS_ITEMS_PER_PAGE = 10;

const books = ref([]);
const pageIndex = ref(parseInt(router.currentRoute.value.query.page) || 1);
const pagesMax = ref(0);

const pb = inject(PROVIDE.PB);
const db = inject(PROVIDE.DB);

const booksCollection = pb.collection('books');

const loadBooks = async () => {
  isBooksLoading.value = true;
  return db.allDocs({include_docs: true, limit: BOOKS_ITEMS_PER_PAGE, skip: (pageIndex.value - 1) * BOOKS_ITEMS_PER_PAGE}).then((result) => {
    console.log('> BooksPage -> loadBooks: result =', result);
    pagesMax.value = Math.ceil(result.total_rows / BOOKS_ITEMS_PER_PAGE);
    books.value = result.rows.map(item => item.doc);
    isBooksLoading.value = false;
  }).catch((e) => {
    console.log('> BooksPage -> loadBooks: error =', e);
  });

  // return booksCollection.getList(pageIndex.value, BOOKS_ITEMS_PER_PAGE).then((result) => {
  //   console.log('> result', result);
  //   pagesMax.value = result.totalPages;
  //   books.value = result.items;
  //   isBooksLoading.value = false;
  // });
};

const insertBooks = async (booksList) => {
  return db.bulkDocs(booksList, {include_docs: true}).then((results) => {
    console.log('insertBooks -> results:', results);
  }).catch(e => {
    console.log('insertBooks -> e:', e);
  });
};

const onUploadClick = () => {
  console.log('> BooksPage -> onUploadClick:', domInputFile.value);
  const setActiveForUploadUI = (value, negativeValue = !value) => {
    domBtnUpload.value.disabled = negativeValue;
    domInputFile.value.disabled = negativeValue;
    isUploading.value = negativeValue;
  };
  domInputFile.value.oninput = () => {
    const fileList = domInputFile.value.files;
    const selectedFile = fileList[0];
    const reader = new FileReader();
    console.log('>\t files', fileList);
    console.log('>\t selectedFile:', selectedFile);
    setActiveForUploadUI(false);

    reader.onload = async () => {
      const booksRaw = JSON.parse(reader.result.toString());
      console.log('selectedFile:', booksRaw);
      try {
        await insertBooks(booksRaw);
      } catch (e) {
        console.log(e);
      }
      setActiveForUploadUI(true);
      reader.onload = null;
      domInputFile.value.oninput = null;
      await loadBooks();
    };
    reader.readAsText(selectedFile);
  };
  domInputFile.value.click();
};

const onChangePage = (delta) => {
  console.log('> BooksPage -> onChangePage', {delta});
  pageIndex.value += delta;
  loadBooks().then(() => {
    router.replace( {
      query: { page: pageIndex.value }
    });
  });
};

onMounted(() => {
  Promise.all([
    loadBooks()
  ]).then(() => {
    isReady.value = true;
  });
});

</script>
<template>
  <div v-if="!isReady">
    Page Loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <button
        :disabled="pageIndex === 1"
        @click="onChangePage(-1)"
      >
        Prev
      </button>
      <button
        :disabled="pageIndex === pagesMax"
        @click="onChangePage(1)"
      >
        Next
      </button>
      <div>
        <b>Books ( {{ pageIndex }} / {{ pagesMax }} ):</b>
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
      <div v-if="isUploading">
        In progess, wait please ...
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>