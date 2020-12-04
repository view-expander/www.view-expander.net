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
      {children}
    </Helmet>
  )
}

export default SEO
