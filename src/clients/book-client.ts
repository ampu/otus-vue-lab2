import type {BookModel} from '@/helpers/book-types'
import type {AuthorModel} from '@/helpers/author-types'

const BookEndpoint = {
  GET_BOOKS: `https://www.googleapis.com/books/v1/volumes`,
}

interface GetBooksJson {
  items: Array<RemoteBookModel>
}

interface RemoteBookModel {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    description: string
    industryIdentifiers: Array<{ type: string, identifier: string }>
    imageLinks: {
      thumbnail: string
    }
    categories: string[]
  }
  saleInfo: {
    retailPrice: {
      amount: number
    }
  }
}

enum IndustryIdentifierType {
  ISBN_13 = `ISBN_13`,
}

const convertBookAndAuthor = (remoteBookModel: RemoteBookModel): { book: BookModel, author: AuthorModel } => {
  const {id, volumeInfo, saleInfo} = remoteBookModel
  const {title, authors: remoteAuthorNames, publishedDate, description, industryIdentifiers, imageLinks, categories} = volumeInfo
  const [author] = remoteAuthorNames?.map(convertAuthor) ?? []
  const [category] = categories ?? []

  const book: BookModel = {
    id,
    isbn: industryIdentifiers?.find(({type}) => type === IndustryIdentifierType.ISBN_13)?.identifier,
    year: Number.parseInt(publishedDate) || undefined,
    title,
    authorId: author?.id,
    posterUrl: imageLinks.thumbnail,
    description,
    tags: [],
    price: saleInfo.retailPrice?.amount,
    category,
  }

  return {book, author}
}

const convertAuthor = (remoteAuthorName: string): AuthorModel => {
  return {
    id: remoteAuthorName,
    name: remoteAuthorName,
  }
}

export default {
  async getBooks(query: string) {
    const json = await fetch(`${BookEndpoint.GET_BOOKS}?q=${encodeURIComponent(query)}`)
      .then(response => response.json()) as GetBooksJson

    const bookAndAuthors = json.items.map(convertBookAndAuthor)

    return {
      books: bookAndAuthors.map(({book}) => book).filter(Boolean),
      authors: bookAndAuthors.map(({author}) => author).filter(Boolean),
    }
  }
}
