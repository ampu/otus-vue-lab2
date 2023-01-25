<template>
  <div>
    <h1>Add Book</h1>
    <BookForm @update:modelValue="onSubmit"/>
  </div>
</template>

<script setup lang="ts">
import BookForm from '@/components/book/BookForm.vue'
import {useBookStore} from '@/stores/book-store'
import {useRouter} from 'vue-router'
import type {BookModel} from '@/helpers/book-types'

const router = useRouter()
const {addBook} = useBookStore()

const onSubmit = async (book: BookModel) => {
  await addBook(book);
  await router.push({name: `books`})
}
</script>
