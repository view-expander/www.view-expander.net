import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Footer from './footer'
import Header from './header'

const Container = styled.div`
  will-change: opacity;
  box-sizing: border-box;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-top: 80px;
  margin-bottom: 80px;
  margin-right: auto;
  margin-left: auto;
  color: #212529;

  html:not(.no-js) & {
    opacity: 0;
    transition: opacity 200ms ease-out 300ms;
  }

  html:not(.no-js).wf-loading & {
    opacity: 0;
  }

  html:not(.no-js).wf-active &,
  html:not(.no-js).wf-inactive & {
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

const Seo: React.FC = () => {
  const noJsClassName = 'no-js'

  useEffect(() => {
    const $noJs = document.querySelector(`.${noJsClassName}`)
    if ($noJs) {
      $noJs.classList.remove(noJsClassName)
    }
  })

  return (
    <Helmet>
      <html lang="ja" className={noJsClassName} />
      <script>{`
        setTimeout(() => (function(d) {
          var config = {
            kitId: "${process.env.GATSBY_TYPEKIT_ID}",
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document), 1);
      `}</script>
    </Helmet>
  )
}

const Layout: React.FC = ({ children }) => (
  <>
    <Seo />
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  </>
)

export default Layout
