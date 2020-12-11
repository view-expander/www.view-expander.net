import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { BlogPostQuery } from '../../../graphql-types'
import BlogPost from '../../components/blog-post'
import Layout from '../../components/layout'
import NavFooting from '../../components/nav-footing'
import SEO from '../../components/seo'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { isStringOfNotEmpty } from '../../libs'

const createNavItem = (
  path: string,
  item: { slug?: string | null; title?: string | null } | undefined
) => {
  if (!isStringOfNotEmpty(path)) {
    throw new Error('empty path')
  }

  if (!item) {
    return
  }

  const slug = item.slug || ''
  const title = item.title || undefined

  return {
    path: `/${path}/${slug}`,
    title,
  }
}

const BlogPostTemplate: React.FC<PageProps<BlogPostQuery>> = ({ data }) => {
  const siteMetadata = useSiteMetadata()
  const node = data.contentfulBlogPost

  if (!siteMetadata?.blogPostPagePath || !node) {
    return null
  }

  const { blogPostPagePath } = siteMetadata
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
      <NavFooting
        newer={createNavItem(blogPostPagePath, newer)}
        older={createNavItem(blogPostPagePath, older)}
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
