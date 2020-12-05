import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { BlogPostQuery } from '../../../graphql-types'
import BlogPost from '../../components/blog-post'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

const BlogPostTemplate: React.FC<PageProps<BlogPostQuery>> = ({ data }) => {
  const node = data.contentfulBlogPost

  if (!node) {
    return null
  }

  const description = node.body?.childMarkdownRemark?.excerpt || undefined

  return (
    <Layout>
      <SEO description={description} title={node.title || undefined} />
      <BlogPost
        body={node.body || null}
        date={node.date}
        slug={node.slug || null}
        pictures={node.pictures || []}
        tags={node.tags || []}
        title={node.title || null}
      />
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
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
          excerpt(truncate: true)
        }
      }
    }
  }
`

export default BlogPostTemplate
