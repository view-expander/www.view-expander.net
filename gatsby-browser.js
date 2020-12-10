/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

require('./src/styles/index.css')

const detectBrowser = async () => {
  const $html = document.querySelector('html')

  if (!$html) {
    return
  }

  // IE11
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    $html.setAttribute('data-browser', 'ie11')
  }
}

const loadPolyfills = async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

const main = () => {
  return Promise.all([detectBrowser(), loadPolyfills()])
}

main()
