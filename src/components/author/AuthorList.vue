<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <tr class="title">
        <th>Name</th>
        <th>Country</th>
      </tr>
      <tr class="filter">
        <th>
          <input class="form-control" v-model="filter.name" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
        <th>
          <input class="form-control" v-model="filter.country" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
      </tr>
    </thead>
    <tbody v-if="fetchStatus === OpStatus.PENDING">
      <tr>
        <td colspan="10">Loading...</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.ERROR">
      <tr>
        <td colspan="10">Something went wrong... Please come back later!</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.SUCCESS && isEmpty">
      <tr>
        <td colspan="10">No authors found... Please add one!</td>
      </tr>
    </tbody>
    <tbody v-else-if="fetchStatus === OpStatus.SUCCESS && isEmptyByFilter">
      <tr>
        <td colspan="10">No authors matching your filter... Please weaken your requirements!</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.SUCCESS">
      <tr
        v-for="author of pageAuthors"
        :key="author.id"
      >
        <td>
          {{ author.name }}
        </td>
        <td>
          {{ author.country ?? `-` }}
        </td>
      </tr>
    </tbody>

    <TableFooter
      v-if="fetchStatus === OpStatus.SUCCESS"
      v-model:page="page"
      :isFiltered="isFiltered"
      :total="allAuthors.length"
      :filtered="filteredAuthors.length"
      :perPage="perPage"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'

import {useAuthorStore} from '@/stores/author-store'
import {useBookStore} from '@/stores/book-store'
import type {AuthorFilterModel} from '@/helpers/author-types'
import {OpStatus} from '@/helpers/op-types'
import TableFooter from '@/components/TableFooter.vue'
import {getPageItems} from '@/helpers/pagination-helpers'

const {getAuthors} = useAuthorStore()
const {fetchBooks, getFetchStatus} = useBookStore()

const fetchStatus = computed(getFetchStatus)
const filter = ref({} as AuthorFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const allAuthors = computed(getAuthors)
const filteredAuthors = computed(() => getAuthors(filter.value))
const pageAuthors = computed(() => getPageItems(filteredAuthors.value, page.value, perPage.value))
const isEmpty = computed(() => allAuthors.value.length === 0)
const isEmptyByFilter = computed(() => filteredAuthors.value.length === 0)
const page = ref(1)
const perPage = ref(5)

onBeforeMount(fetchBooks)
</script>
