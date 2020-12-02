import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { LayoutComponentQuery } from '../../graphql-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`

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
    <Container>
      <header>
        <h1>{data.site?.siteMetadata?.title}</h1>
      </header>
      <main>{children}</main>
      <footer>© {data.site?.siteMetadata?.author}. All rights reserved.</footer>
    </Container>
  )
}

export default Layout
