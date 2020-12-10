/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

require('./src/styles/index.css')

const loadPolyfills = async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

const main = () => {
  return Promise.all([loadPolyfills()])
}

main()
