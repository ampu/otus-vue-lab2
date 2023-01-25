<template>
  <div>
    <h1>Books</h1>

    <div class="mb-3">
      <RouterLink
        to="/books/add"
        class="btn btn-primary"
      >
        Add Book
      </RouterLink>
    </div>

    <BookList/>
  </div>
</template>

<style>
</style>
<script setup lang="ts">
import BookList from '@/components/book/BookList.vue'
</script>
