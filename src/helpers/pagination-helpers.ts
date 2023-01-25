import _ from 'lodash'

export const getPageItems = <T>(items: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage
  const end = start + perPage
  return items.slice(start, end)
}

export const createPagination = (page: number, total: number, perPage: number, pageRange = 3) => {
  const totalPages = Math.ceil(total / perPage)

  page = _.clamp(page, 1, totalPages)
  pageRange = _.clamp(pageRange, totalPages)

  let delta = Math.ceil(pageRange / 2)
  let pages
  if (page - delta > totalPages - pageRange) {
    pages = _.range(totalPages - pageRange + 1, totalPages + 1)
  }
  else {
    if (page - delta < 0) {
      delta = page
    }
    const offset = page - delta
    pages = _.range(offset + 1, offset + pageRange + 1)
  }

  const proximity = Math.floor(pageRange / 2)

  let startPage = page - proximity
  let endPage = page + proximity

  if (startPage < 1) {
    endPage = Math.min(endPage + (1 - startPage), totalPages)
    startPage = 1
  }

  if (endPage > totalPages) {
    startPage = Math.max(startPage - (endPage - totalPages), 1)
    endPage = totalPages
  }

  return {
    page,
    perPage,
    totalPages,
    total,
    pageRange,
    startPage,
    endPage,
    previousPage: page > 1 ? page - 1 : 0,
    nextPage: page < totalPages ? page + 1 : 0,
    pagesInRange: pages,
    firstPageInRange: Math.min(...pages),
    lastPageInPage: Math.max(...pages),
  }
}