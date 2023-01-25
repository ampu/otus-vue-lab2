import {ref} from 'vue'
import {defineStore} from 'pinia'

import type {BookFilterModel, BookModel} from '@/helpers/book-types'
import bookClient from '@/clients/book-client'
import {useAuthorStore} from '@/stores/author-store'
import {OpStatus} from '@/helpers/op-types'

export const useBookStore = defineStore(`book`, () => {
  const fetchStatus = ref(OpStatus.NONE)
  const books = ref([] as BookModel[])

  const getFetchStatus = () => fetchStatus.value

  const addBook = async (book: BookModel) => {
    books.value.push(book)
  }

  const removeBook = async ({id}: BookModel) => {
    books.value = books.value.filter((book) => book.id !== id)
  }

  const getBooks = (filter?: BookFilterModel) => {
    if (!filter) {
      return books.value
    }
    const {
      title,
      minYear,
      maxYear,
      category,
      minPrice,
      maxPrice,
    } = filter
    const lcTitle = title?.toLowerCase()
    const lcCategory = category?.toLowerCase()
    return books.value.filter((book) =>
      (!lcTitle || book.title?.toLowerCase().includes(lcTitle))
      && (!minYear || minYear <= book.year!)
      && (!maxYear || book.year! <= maxYear)
      && (!lcCategory || book.category?.toLowerCase().includes(lcCategory))
      && (!minPrice || minPrice <= book.price!)
      && (!maxPrice || book.price! <= maxPrice))
  }

  const fetchBooks = async () => {
    if ([OpStatus.PENDING, OpStatus.SUCCESS].includes(fetchStatus.value)) {
      return
    }
    try {
      fetchStatus.value = OpStatus.PENDING
      const {books, authors} = await bookClient.getBooks(`vue.js`)
      books.forEach(addBook)

      const {addAuthor} = useAuthorStore()
      authors.forEach(addAuthor)
      fetchStatus.value = OpStatus.SUCCESS
    } catch (err) {
      fetchStatus.value = OpStatus.ERROR
      console.error((err as Error).stack)
    }
  }

  return {
    addBook,
    removeBook,
    getBooks,
    getFetchStatus,
    fetchBooks,
  }
})