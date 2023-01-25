<template>
  <div>
    <h1>Add Author</h1>
    <AuthorForm @update:modelValue="onSubmit"/>
  </div>
</template>

<script setup lang="ts">
import AuthorForm from '@/components/author/AuthorForm.vue'
import {useAuthorStore} from '@/stores/author-store'
import {useRouter} from 'vue-router'
import type {AuthorModel} from '@/helpers/author-types'

const router = useRouter()
const {addAuthor} = useAuthorStore()

const onSubmit = async (author: AuthorModel) => {
  await addAuthor(author);
  await router.push({name: `authors`})
}
</script>
