<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <tr class="title">
        <th style="width: 20%">Author</th>
        <th style="width: 5%"></th>
        <th>Title</th>
        <th style="width: 15%">Year</th>
        <th style="width: 15%">Category</th>
        <th style="width: 15%">Price</th>
        <th/>
      </tr>
      <tr class="filter">
        <th/>
        <th/>
        <th>
          <input class="form-control" v-model="filter.title" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
        <th>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model="filter.minYear"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
            <span class="input-group-text">-</span>
            <input
              type="number"
              class="form-control"
              v-model="filter.maxYear"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
          </div>
        </th>
        <th>
          <input class="form-control" v-model="filter.category" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
        <th>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model="filter.minPrice"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
            <span class="input-group-text">-</span>
            <input
              type="number"
              class="form-control"
              v-model="filter.maxPrice"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
          </div>
        </th>
        <th/>
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
        <td colspan="10">No books found... Please add one!</td>
      </tr>
    </tbody>
    <tbody v-else-if="fetchStatus === OpStatus.SUCCESS && isEmptyByFilter">
      <tr>
        <td colspan="10">No books matching your filter... Please weaken your requirements!</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.SUCCESS">
      <tr
        v-for="book of pageBooks"
        :key="book.id"
      >
        <td>
          {{ getAuthor(book.authorId)?.name ?? `-` }}
        </td>
        <td>
          <img
            v-if="book.posterUrl"
            :src="book.posterUrl"
            :alt="book.title"
            :title="book.title"
            height="50"
          />
        </td>
        <td class="text-start">
          {{ book.title }}
        </td>
        <td>
          {{ book.year ?? `-` }}
        </td>
        <td>
          {{ book.category ?? `-` }}
        </td>
        <td class="text-end">
          {{ book.price ? `${book.price?.toFixed(2)} ₽` : `-` }}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="removeBook(book)"
          >
            &times;
          </button>
        </td>
      </tr>
    </tbody>

    <TableFooter
      v-if="fetchStatus === OpStatus.SUCCESS"
      v-model:page="page"
      :isFiltered="isFiltered"
      :total="allBooks.length"
      :filtered="filteredBooks.length"
      :perPage="perPage"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'

import {useBookStore} from '@/stores/book-store'
import type {BookFilterModel} from '@/helpers/book-types'
import {useAuthorStore} from '@/stores/author-store'
import {OpStatus} from '@/helpers/op-types'
import TableFooter from '@/components/TableFooter.vue'
import {getPageItems} from '@/helpers/pagination-helpers'

const {getBooks, fetchBooks, getFetchStatus, removeBook} = useBookStore()
const {getAuthor} = useAuthorStore()

const fetchStatus = computed(getFetchStatus)
const filter = ref({} as BookFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const allBooks = computed(getBooks)
const filteredBooks = computed(() => getBooks(filter.value))
const pageBooks = computed(() => getPageItems(filteredBooks.value, page.value, perPage.value))
const isEmpty = computed(() => allBooks.value.length === 0)
const isEmptyByFilter = computed(() => filteredBooks.value.length === 0)
const page = ref(1)
const perPage = ref(5)

onBeforeMount(fetchBooks)
</script>
