import { graphql } from 'gatsby'
import React from 'react'
import { IndexPageQuery } from '../../graphql-types'
import BlogPost from '../components/blog-post'
import Layout from '../components/layout'
import NavFooting from '../components/nav-footing'
import SEO from '../components/seo'
import { isString, isStringOfNotEmpty } from '../libs'
import { getSharingPhotoPath } from '../libs/imgix'
import { PaginatedPageProps } from './models'

const IndexPage: React.FC<PaginatedPageProps<IndexPageQuery>> = ({
  data,
  pageContext,
}) => {
  const featuredPhoto = data.allContentfulBlogPost.edges
    .flatMap(({ node }) => node.pictures || [])
    .find(item => item && item.featured)
  const image =
    featuredPhoto && isString(featuredPhoto.key)
      ? getSharingPhotoPath(featuredPhoto.key)
      : undefined
  const newer = isStringOfNotEmpty(pageContext.previousPagePath)
    ? { path: pageContext.previousPagePath }
    : undefined
  const older = isStringOfNotEmpty(pageContext.nextPagePath)
    ? { path: pageContext.nextPagePath }
    : undefined

  return (
    <Layout>
      <SEO image={image} />
      {data.allContentfulBlogPost.edges.map(({ node }) =>
        node ? (
          <BlogPost
            key={node.slug}
            body={node.body || null}
            date={node.date}
            permanent={false}
            pictures={node.pictures || []}
            slug={node.slug || null}
            tags={node.tags || []}
            title={node.title || null}
          />
        ) : undefined
      )}
      <NavFooting newer={newer} older={older} />
    </Layout>
  )
}

export const query = graphql`
  query IndexPage($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          slug
          date(locale: "ja-jp")
          pictures {
            featured
            height
            key
            width
          }
          tags {
            name
            slug
          }
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`

export default IndexPage
