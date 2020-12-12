import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

type Props = {
  description?: string
  next?: string
  prev?: string
  title?: string
  url?: string
}

const SEO: React.FC<Props> = ({
  children,
  description,
  next,
  prev,
  title,
  url,
}) => {
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata?.description || undefined
  const defaultTitle = siteMetadata?.title || undefined
  const defaultUrl = siteMetadata?.siteUrl || undefined
  const author = siteMetadata?.author || undefined

  return (
    <Helmet>
      <html lang="ja" />
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle || ''}</title>
      {siteMetadata?.facebookAppId ? (
        <meta property="fb:app_id" content={siteMetadata.facebookAppId} />
      ) : undefined}
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="ja_JP" />
      <link rel="canonical" href={url || defaultUrl} />
      {prev ? <link rel="prev" href={prev} /> : undefined}
      {next ? <link rel="next" href={next} /> : undefined}
      <meta property="og:url" content={url || defaultUrl} />
      <meta name="og:title" content={title || defaultTitle} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="author" content={author} />
      <meta name="twitter:creator" content={author} />
      {children}
    </Helmet>
  )
}

export default SEO
