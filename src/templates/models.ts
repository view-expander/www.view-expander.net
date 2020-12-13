import { PageProps } from 'gatsby'

export type PaginatedPageProps<T> = PageProps<T> & {
  pageContext: PageProps<T>['pageContext'] & {
    nextPagePath: string
    previousPagePath: string
  }
}
