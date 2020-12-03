import React from 'react'
import styled from 'styled-components'
import Footer from './footer'
import Header from './header'
import SEO from './seo'

const Container = styled.div`
  will-change: opacity;
  opacity: 0;
  box-sizing: border-box;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-top: 80px;
  margin-bottom: 80px;
  margin-right: auto;
  margin-left: auto;
  color: #212529;
  transition: opacity 200ms ease-out 300ms;

  .wf-loading & {
    opacity: 0;
  }

  .wf-active &,
  .wf-inactive & {
    opacity: 1;
  }

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

  main {
    margin-top: 100px;
  }
`

const CONTAINER_ID = 'container'

const Layout: React.FC = ({ children }) => (
  <>
    <SEO>
      <noscript>{`<style type="text/css">#${CONTAINER_ID} { opacity: 1 }</style>`}</noscript>
    </SEO>
    <Container id={CONTAINER_ID}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  </>
)

export default Layout
