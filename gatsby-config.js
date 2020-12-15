require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')

module.exports = {
  siteMetadata: {
    author: `@haribote_nobody`,
    blogPostPagePath: `post`,
    description: `旅と写真のブログ`,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    instagram: `haribote`,
    siteUrl: 'https://view-expander.net/',
    tagsPagePath: `tags`,
    title: `View Expander`,
    twitter: `haribote_nobody`,
    typekitId: process.env.GATSBY_TYPEKIT_ID,
    youtube: `UCNR5LeFbBlOwjq7uefmyyOw`,
  },
  plugins: [
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `View Expander`,
        short_name: `View Expander`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#212529`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: `/index.xml`,
            query: `{
              allContentfulBlogPost(sort: {fields: date, order: DESC}) {
                edges {
                  node {
                    date
                    slug
                    title
                    childContentfulBlogPostBodyTextNode {
                      childMarkdownRemark {
                        html
                        excerpt(truncate: true)
                      }
                    }
                  }
                }
              }
            }`,
            serialize: ({ query: { site, allContentfulBlogPost } }) =>
              allContentfulBlogPost.edges.map(({ node }) => {
                const hasBody =
                  node.childContentfulBlogPostBodyTextNode &&
                  node.childContentfulBlogPostBodyTextNode.childMarkdownRemark
                const description = hasBody
                  ? node.childContentfulBlogPostBodyTextNode.childMarkdownRemark
                      .excerpt
                  : null
                const url = path.join(
                  site.siteMetadata.siteUrl,
                  site.siteMetadata.blogPostPagePath,
                  node.slug
                )

                return Object.assign(
                  {},
                  {
                    title: node.title,
                    url,
                    guid: url,
                    date: node.date,
                    description,
                    custom_elements: [
                      {
                        'content:encoded': hasBody
                          ? node.childContentfulBlogPostBodyTextNode
                              .childMarkdownRemark.html
                          : null,
                      },
                    ],
                  }
                )
              }),
          },
        ],
        query: `
          {
            site {
              siteMetadata {
                blogPostPagePath
                description
                siteUrl
                site_url: siteUrl
                title
              }
            }
          }
        `,
      },
    },
  ],
}
