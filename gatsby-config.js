require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')
const ImgixClient = require('imgix-core-js')
const IMGIX_DOMAIN = process.env.GATSBY_IMGIX_DOMAIN
const imgixClient = new ImgixClient({ domain: IMGIX_DOMAIN })

module.exports = {
  siteMetadata: {
    author: `@haribote_nobody`,
    blogPostPagePath: `post`,
    description: `旅と写真のブログ`,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    imgixDomain: IMGIX_DOMAIN,
    instagram: `haribote`,
    siteUrl: 'https://www.view-expander.net/',
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
                    body {
                      childMarkdownRemark {
                        excerpt(pruneLength: 100, truncate: true)
                        html
                      }
                    }
                    date
                    pictures {
                      key
                    }
                    slug
                    title
                  }
                }
              }
            }`,
            serialize: ({ query: { site, allContentfulBlogPost } }) =>
              allContentfulBlogPost.edges.map(({ node }) => {
                const hasBody = Boolean(
                  node.body && node.body.childMarkdownRemark
                )
                const description = (hasBody
                  ? node.body.childMarkdownRemark.excerpt.split('　')
                  : [site.siteMetadata.description]
                ).join('')
                const url = `${site.siteMetadata.siteUrl}${path.join(
                  site.siteMetadata.blogPostPagePath,
                  node.slug
                )}`

                return Object.assign(
                  {},
                  {
                    title: node.title,
                    url,
                    date: node.date,
                    description,
                    custom_elements: [
                      {
                        'content:encoded': `${node.pictures
                          .map(
                            ({ key }) =>
                              `<p><img src="${imgixClient.buildURL(
                                `${process.env.GATSBY_IMGIX_PATH}/${key}`,
                                {
                                  auto: 'format',
                                  fit: 'clip',
                                  w: 688,
                                  h: 688,
                                  q: 75,
                                }
                              )}" alt="" /></p>`
                          )
                          .join('')}${
                          hasBody ? node.body.childMarkdownRemark.html : ''
                        }`,
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
