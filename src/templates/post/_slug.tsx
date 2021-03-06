import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { BlogPostQuery } from '../../../graphql-types'
import BlogPost from '../../components/blog-post'
import Layout from '../../components/layout'
import NavFooting from '../../components/nav-footing'
import SEO from '../../components/seo'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { getPath, isString, isStringOfNotEmpty } from '../../libs'
import { getSharingPhotoPath } from '../../libs/imgix'

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
    path: getPath(undefined, path, slug),
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
  const url = getPath(
    isString(siteMetadata.siteUrl) ? `${siteMetadata.siteUrl}/` : undefined,
    siteMetadata.blogPostPagePath,
    node.slug
  )
  const newer = createNavItem(
    blogPostPagePath,
    indexOfCurrentNode > 0
      ? allContentfulBlogPost[indexOfCurrentNode - 1]
      : undefined
  )
  const older = createNavItem(
    blogPostPagePath,
    indexOfCurrentNode < allContentfulBlogPost.length - 1
      ? allContentfulBlogPost[indexOfCurrentNode + 1]
      : undefined
  )
  const featuredPhoto = node.pictures?.find(item => item && item.featured)
  const image =
    featuredPhoto && isString(featuredPhoto.key)
      ? getSharingPhotoPath(featuredPhoto.key)
      : undefined

  return (
    <Layout>
      <SEO
        description={description}
        image={image}
        next={newer?.path}
        prev={older?.path}
        title={node.title || undefined}
        type={`article`}
        url={url}
      />
      <BlogPost
        body={node.body || null}
        date={node.date}
        series={node.series || null}
        slug={node.slug || null}
        pictures={node.pictures || []}
        tags={node.tags || []}
        title={node.title || null}
      />
      <NavFooting newer={newer} older={older} />
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      body {
        childMarkdownRemark {
          html
          excerpt(truncate: true)
        }
      }
      date(locale: "ja-jp")
      pictures {
        featured
        height
        key
        width
      }
      series {
        name
        slug
      }
      slug
      tags {
        name
        slug
      }
      title
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
