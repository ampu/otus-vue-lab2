<template>
  <form
    class="AuthorForm"
    @submit.prevent="onSubmit"
  >
    <div class="content-wrapper">
      <div
        v-if="fetchStatus === OpStatus.PENDING"
        class="fetch-badge"
      >
        Loading...
      </div>

      <div
        v-if="fetchStatus === OpStatus.ERROR"
        class="fetch-badge"
      >
        Something went wrong... Please come back later!
      </div>

      <div
        class="content"
        :class="{active: fetchStatus === OpStatus.SUCCESS}"
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
            :disabled="fetchStatus !== OpStatus.SUCCESS"
          />
        </div>

        <div class="mb-3 btn-group">
          <input
            type="radio"
            id="author-sex-female"
            value="female"
            class="btn-check"
            v-model="author.sex"
            :disabled="fetchStatus !== OpStatus.SUCCESS"
          />
          <label
            for="author-sex-female"
            class="btn btn-outline-primary d-flex align-items-center gap-1"
          >
            <FemaleIcon/>
            Female
          </label>
          <input
            type="radio"
            id="author-sex-male"
            value="male"
            class="btn-check"
            v-model="author.sex"
            :disabled="fetchStatus !== OpStatus.SUCCESS"
          />
          <label
            for="author-sex-male"
            class="btn btn-outline-primary d-flex align-items-center gap-1"
          >
            <MaleIcon/>
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
            :disabled="fetchStatus !== OpStatus.SUCCESS"
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
            :disabled="fetchStatus !== OpStatus.SUCCESS"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 mb-3 d-flex justify-content-between gap-2">
      <button
        type="button"
        class="btn btn-secondary d-flex align-items-center gap-1"
        @click="router.back()"
      >
        <ReturnIcon/>
        Back
      </button>
      <button
        type="reset"
        class="btn btn-danger me-auto d-flex align-items-center gap-1"
        @click.prevent="onReset"
        :disabled="fetchStatus !== OpStatus.SUCCESS"
      >
        <ResetIcon/>
        Reset
      </button>
      <button
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-1"
        :disabled="fetchStatus !== OpStatus.SUCCESS"
      >
        <slot>Submit</slot>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from 'vue'
import {nanoid} from 'nanoid'
import {useRouter} from 'vue-router'

import MaleIcon from '@/assets/icons/male.svg'
import FemaleIcon from '@/assets/icons/female.svg'
import ResetIcon from '@/assets/icons/reset.svg'
import ReturnIcon from '@/assets/icons/return.svg'

import type {AuthorModel} from '@/helpers/author-types'
import {useBookStore} from '@/stores/book-store'
import {OpStatus} from '@/helpers/op-types'

const props = defineProps<{
  modelValue?: AuthorModel
}>()

const emit = defineEmits<{
  (e: `update:model-value`, author: AuthorModel): void
}>()

const router = useRouter()
const author = ref({} as AuthorModel)
const {fetchBooks, getFetchStatus} = useBookStore()
const fetchStatus = computed(getFetchStatus)

const onReset = () => {
  author.value = {} as AuthorModel
  Object.assign(author.value, props.modelValue)
  if (!author.value.id) {
    author.value.id = nanoid()
  }
}

const onSubmit = () => {
  emit(`update:model-value`, {...author.value})
}

watch(props, onReset, {immediate: true})

onBeforeMount(fetchBooks)
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
}

.fetch-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  font-size: 2em;
  text-shadow: 2px 2px white;
}

.content {
  &:not(.active) {
    filter: blur(5px);
  }
}

.btn:disabled {
  filter: blur(5px);
}
</style>
