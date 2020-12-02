/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('./src/styles/index.css')
const typeKit = require('./src/libs/type-kit')

exports.onClientEntry = () => {
  typeKit(document)
}
