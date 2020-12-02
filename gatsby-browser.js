/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

require('./src/styles/index.css')
const typeKit = require('./src/libs/type-kit')

exports.onClientEntry = () => {
  typeKit(document, process.env.TYPEKIT_ID)
}
