import { graphql, Link, PageProps } from 'gatsby'
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
  const allContentfulBlogPost = data.allContentfulBlogPost.edges.map(
    ({ node }) => ({ ...node })
  )
  const indexOfCurrentNode = allContentfulBlogPost.findIndex(
    ({ slug }) => slug === node.slug
  )
  const newer =
    indexOfCurrentNode > 0
      ? allContentfulBlogPost[indexOfCurrentNode - 1]
      : undefined
  const older =
    indexOfCurrentNode < allContentfulBlogPost.length - 1
      ? allContentfulBlogPost[indexOfCurrentNode + 1]
      : undefined

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
      <nav>
        {newer ? (
          <p>
            <Link to={`/post/${newer.slug}`}>Newer: {newer.title}</Link>
          </p>
        ) : undefined}
        {older ? (
          <p>
            <Link to={`/post/${older.slug}`}>Older: {older.title}</Link>
          </p>
        ) : undefined}
      </nav>
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
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`

export default BlogPostTemplate
