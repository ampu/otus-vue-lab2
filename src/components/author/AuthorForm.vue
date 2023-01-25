<template>
  <form
    class="AuthorForm"
    @submit.prevent="onSubmit"
  >
    <div class="mb-3">
      <label
        for="author-name"
        class="form-label"
      >
        Name
      </label>
      <input
        type="text"
        id="author-name"
        class="form-control"
        required
        v-focus
        v-model="author.name"
      />
    </div>

    <div class="mb-3 btn-group">
      <input
        type="radio"
        id="author-sex-female"
        value="female"
        class="btn-check"
        v-model="author.sex"
      />
      <label
        for="author-sex-female"
        class="btn btn-outline-primary"
      >
        Female
      </label>
      <input
        type="radio"
        id="author-sex-male"
        value="male"
        class="btn-check"
        v-model="author.sex"
      />
      <label
        for="author-sex-male"
        class="btn btn-outline-primary"
      >
        Male
      </label>
    </div>

    <div class="mb-3">
      <label
        for="author-birth"
        class="form-label"
      >
        Birthday
      </label>
      <input
        type="date"
        id="author-birth"
        class="form-control"
        v-model="author.birthday"
      />
    </div>

    <div class="mb-3">
      <label
        for="author-country"
        class="form-label"
      >
        Country
      </label>
      <input
        type="text"
        id="author-country"
        class="form-control"
        v-model="author.country"
      />
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
import {ref, watch} from 'vue'
import {nanoid} from 'nanoid'
import type {AuthorModel} from '@/helpers/author-types'

const props = defineProps<{
  modelValue?: AuthorModel
}>()

const emit = defineEmits<{
  (e: `update:model-value`, author: AuthorModel): void
}>()

const author = ref({} as AuthorModel)

watch(props, () => {
  author.value = {} as AuthorModel
  Object.assign(author, props.modelValue)
})

const onSubmit = () => {
  author.value.id = nanoid()
  emit(`update:model-value`, {...author.value})
}
</script>

<style lang="scss">
</style>
