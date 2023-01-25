<template>
  <div>
    <h1>Authors</h1>

    <div class="mb-3">
      <RouterLink
        to="/authors/add"
        class="btn btn-primary"
      >
        Add Author
      </RouterLink>
    </div>

    <AuthorList/>
  </div>
</template>

<style>
</style>
<script setup lang="ts">
import AuthorList from '@/components/author/AuthorList.vue'
</script>
