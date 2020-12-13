import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { IndexPageQuery } from '../../graphql-types'
import BlogPost from '../components/blog-post'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { isString } from '../libs'
import { getSharingPhotoPath } from '../libs/imgix'

const IndexPage: React.FC<PageProps<IndexPageQuery>> = ({ data }) => {
  const featuredPhoto = data.allContentfulBlogPost.edges
    .flatMap(({ node }) => node.pictures || [])
    .find(item => item && item.featured)
  const image =
    featuredPhoto && isString(featuredPhoto.key)
      ? getSharingPhotoPath(featuredPhoto.key)
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
    </Layout>
  )
}

export const query = graphql`
  query IndexPage {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
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
