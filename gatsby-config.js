require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `View Expander`,
    description: `旅と写真のブログ`,
    author: `@haribote_nobody`,
    instagram: `haribote`,
    twitter: `haribote_nobody`,
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
  ],
}
