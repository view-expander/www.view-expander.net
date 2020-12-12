/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

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
        edges {
          node {
            slug
          }
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
  const { blogPostPagePath, tagsPagePath } = result.data.site.siteMetadata

  result.data.allContentfulBlogPost.edges.forEach(({ node }) =>
    createPage({
      path: createClosedPath(blogPostPagePath, node.slug),
      component: path.resolve(`./src/templates/post/_slug.tsx`),
      context: {
        slug: node.slug,
      },
    })
  )

  result.data.allContentfulTag.edges.forEach(({ node }) =>
    createPage({
      path: createClosedPath(tagsPagePath, node.slug),
      component: path.resolve(`./src/templates/tags/_slug.tsx`),
      context: {
        slug: node.slug,
      },
    })
  )
}
