/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

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

  result.data.allContentfulBlogPost.edges.forEach(({ node }) =>
    createPage({
      path: `${result.data.site.siteMetadata.blogPostPagePath}/${node.slug}/`,
      component: path.resolve(`./src/templates/post/_slug.tsx`),
      context: {
        slug: node.slug,
      },
    })
  )

  result.data.allContentfulTag.edges.forEach(({ node }) =>
    createPage({
      path: `${result.data.site.siteMetadata.tagsPagePath}/${node.slug}/`,
      component: path.resolve(`./src/templates/tags/_slug.tsx`),
      context: {
        slug: node.slug,
      },
    })
  )
}
