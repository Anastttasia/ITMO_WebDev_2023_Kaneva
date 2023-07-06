export const useBooks = () => {
  const books = useState('books', () => []);
  const isBooksLoading = ref(books.value.length === 0);
  if (isBooksLoading.value) {
    useLazyFetch('/api/books', { server: false }).then((response) => {
      console.log(response.data);
      books.value = response.data;
    }).finally(() => isBooksLoading.value = false);
  }
  return { books, isBooksLoading };
};