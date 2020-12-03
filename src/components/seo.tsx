import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const SEO: React.FC<{ description?: string; title?: string }> = ({
  children,
  description,
  title,
}) => {
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata?.description || undefined
  const defaultTitle = siteMetadata?.title || undefined

  return (
    <Helmet>
      <html lang="ja" />
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle || ''}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="og:site_name" content={defaultTitle} />
      <meta name="og:title" content={title || defaultTitle} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:creator"
        content={siteMetadata?.author || undefined}
      />
      <script>{`
        setTimeout(() => (function(d) {
          var config = {
            kitId: "${siteMetadata?.typekitId}",
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document), 1);
      `}</script>
      {children}
    </Helmet>
  )
}

export default SEO
