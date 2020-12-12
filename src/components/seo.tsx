import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

type Props = {
  description?: string
  next?: string
  prev?: string
  title?: string
}

const SEO: React.FC<Props> = ({ children, description, next, prev, title }) => {
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata?.description || undefined
  const defaultTitle = siteMetadata?.title || undefined

  console.log(`next`, next)
  console.log(`prev`, prev)

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
