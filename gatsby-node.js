/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

const ITEMS_PER_PAGE = 10
const PAGE_PREFIX = 'page'

const createClosedPath = (...pathSegments) => `${path.join(...pathSegments)}/`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query CreatePage {
      allContentfulBlogPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulTag(sort: { fields: name }) {
        nodes {
          blog_post {
            slug
          }
          slug
        }
      }
      site {
        siteMetadata {
          blogPostPagePath
          tagsPagePath
        }
      }
    }
  `)

  if (!result.data) {
    return
  }

  const blogPosts = result.data.allContentfulBlogPost.edges
  const tags = result.data.allContentfulTag.nodes
  const { blogPostPagePath, tagsPagePath } = result.data.site.siteMetadata

  paginate({
    createPage,
    items: blogPosts,
    itemsPerPage: ITEMS_PER_PAGE,
    pathPrefix: ({ pageNumber }) =>
      pageNumber === 0 ? '/' : `/${PAGE_PREFIX}`,
    component: path.resolve(`./src/templates/index.tsx`),
  })

  blogPosts.forEach(({ node }) =>
    createPage({
      path: createClosedPath(blogPostPagePath, node.slug),
      component: path.resolve(`./src/templates/post/_slug.tsx`),
      context: {
        slug: node.slug,
      },
    })
  )

  tags.forEach(({ slug, blog_post }) =>
    paginate({
      createPage,
      items: blog_post || [],
      itemsPerPage: ITEMS_PER_PAGE,
      pathPrefix: ({ pageNumber }) =>
        pageNumber === 0
          ? path.join(tagsPagePath, slug)
          : path.join(tagsPagePath, slug, PAGE_PREFIX),
      component: path.resolve(`./src/templates/tags/_slug.tsx`),
      context: { slug },
    })
  )
}
