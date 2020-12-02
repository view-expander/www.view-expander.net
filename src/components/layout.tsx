/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { LayoutComponentQuery } from '../../graphql-types'

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<LayoutComponentQuery>(graphql`
    query LayoutComponent {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  return (
    <>
      <header>
        <h1>{data.site?.siteMetadata?.title}</h1>
      </header>
      <main>{children}</main>
      <footer>© {data.site?.siteMetadata?.author}. All rights reserved.</footer>
    </>
  )
}

export default Layout
