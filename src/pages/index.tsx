import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { IndexPageQuery } from '../../graphql-types'
import BlogPost from '../components/blog-post'
import Layout from '../components/layout'

const IndexPage: React.FC<PageProps<IndexPageQuery>> = ({ data }) => (
  <Layout>
    {data.allContentfulBlogPost.edges.map(({ node }) =>
      node ? (
        <BlogPost
          key={node.slug}
          body={node.body || null}
          date={node.date}
          pictures={node.pictures || []}
          tags={node.tags || []}
          title={node.title || null}
        />
      ) : undefined
    )}
  </Layout>
)

export const query = graphql`
  query IndexPage {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          slug
          date(locale: "ja-jp")
          pictures {
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
