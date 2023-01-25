<template>
  <form
    class="BookForm"
    @submit.prevent="onSubmit"
  >
    <div class="mb-3">
      <label
        for="book-poster-url"
        class="form-label"
      >
        Poster
      </label>

      <img
        v-if="book.posterUrl"
        class="d-flex mb-3"
        :src="book.posterUrl"
        :alt="book.posterUrl"
        :title="book.posterUrl"
        height="200"
      />

      <input
        type="text"
        id="book-poster-url"
        class="form-control"
        :placeholder="IMAGE_PLACEHOLDER"
        v-model="book.posterUrl"
      />

      <label
        for="book-poster-file"
        class="btn btn-primary mt-3"
      >
        Upload Poster
      </label>
      <input
        type="file"
        id="book-poster-file"
        class="visually-hidden"
        @change="onPosterFileChange"
      />
    </div>

    <div class="mb-3">
      <label
        for="book-title"
        class="form-label"
      >
        Title
      </label>
      <input
        type="text"
        id="book-title"
        class="form-control"
        required
        v-focus
        v-model="book.title"
      />
    </div>

    <div class="mb-3">
      <label
        for="book-author"
        class="form-label"
      >
        Author
      </label>
      <select
        id="book-author"
        class="form-select"
        v-model="book.authorId"
      >
        <option disabled>-- select one --</option>
        <option
          v-for="author of authors"
          :key="author.id"
          :value="author.id"
        >
          {{ author.name }}
        </option>
      </select>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label
          for="book-isbn"
          class="form-label"
        >
          ISBN
        </label>
        <input
          type="number"
          id="book-isbn"
          class="form-control"
          v-model="book.isbn"
        />
      </div>

      <div class="col">
        <label
          for="book-year"
          class="form-label"
        >
          Published Year
        </label>
        <input
          type="number"
          id="book-year"
          class="form-control"
          v-model="book.year"
        />
      </div>
    </div>

    <div class="mb-3">
      <label
        for="book-description"
        class="form-label"
      >
        Description
      </label>
      <textarea
        id="book-description"
        class="form-control"
        v-model="book.description"
      />
    </div>

    <div class="mb-3">
      <label
        for="book-tags"
        class="form-label"
      >
        Tags
      </label>
      <input
        type="text"
        id="book-tags"
        class="form-control"
        v-model="book.tags"
      />
    </div>

    <div class="row mb-3">
      <div class="col">
        <label
          for="book-category"
          class="form-label"
        >
          Category
        </label>
        <input
          type="text"
          id="book-category"
          class="form-control"
          v-model="book.category"
        />
      </div>

      <div class="col">
        <label
          for="book-price"
          class="form-label"
        >
          Price
        </label>
        <input
          type="number"
          id="book-price"
          class="form-control"
          v-model="book.price"
        />
      </div>
    </div>

    <div class="mb-3">
      <button
        type="submit"
        class="btn btn-primary"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from 'vue'
import {nanoid} from 'nanoid'
import type {BookModel} from '@/helpers/book-types'
import {useBookStore} from '@/stores/book-store'
import {useAuthorStore} from '@/stores/author-store'
import {fileToBase64} from '@/helpers/file-helpers'

const {fetchBooks} = useBookStore()
const {getAuthors} = useAuthorStore()

const IMAGE_PLACEHOLDER = `https://via.placeholder.com/200x300`

const props = defineProps<{
  modelValue?: BookModel
}>()

const emit = defineEmits<{
  (e: `update:model-value`, book: BookModel): void
}>()

const authors = computed(getAuthors)
const book = ref({} as BookModel)

watch(props, () => {
  book.value = {} as BookModel
  Object.assign(book, props.modelValue)
})

const onPosterFileChange = async ($event: Event) => {
  const {files} = ($event.target as HTMLInputElement)
  if (!files) {
    return
  }
  const [file] = files
  book.value.posterUrl = await fileToBase64(file)
}

const onSubmit = () => {
  book.value.id = nanoid()
  emit(`update:model-value`, {...book.value})
}

onBeforeMount(fetchBooks)
</script>

<style lang="scss">
</style>
