import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

type Props = {
  description?: string
  image?: string
  next?: string
  prev?: string
  title?: string
  type?: 'article' | 'website'
  url?: string
}

const SEO: React.FC<Props> = ({
  children,
  description,
  image,
  next,
  prev,
  title,
  type = 'website',
  url,
}) => {
  const siteMetadata = useSiteMetadata()
  const metaDescription = description || siteMetadata?.description || undefined
  const defaultTitle = siteMetadata?.title || undefined
  const defaultUrl = siteMetadata?.siteUrl || undefined
  const author = siteMetadata?.author || undefined
  const preConnects = [
    `https://${siteMetadata?.imgixDomain}`,
    'https://use.typekit.net/',
    'https://p.typekit.net/',
  ]

  return (
    <Helmet>
      <html lang="ja" />
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle || ''}</title>
      {siteMetadata?.facebookAppId ? (
        <meta property="fb:app_id" content={siteMetadata.facebookAppId} />
      ) : undefined}
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="ja_JP" />
      <link rel="canonical" href={url || defaultUrl} />
      <link
        href={`${defaultUrl}/index.xml`}
        rel="alternate"
        type="application/rss+xml"
        title={defaultTitle}
      />
      <link
        href={`${defaultUrl}/index.xml`}
        rel="feed"
        type="application/rss+xml"
        title={defaultTitle}
      />
      {prev ? <link rel="prev" href={prev} /> : undefined}
      {next ? <link rel="next" href={next} /> : undefined}
      {preConnects.map(href => (
        <link rel="dns-prefetch" href={href} />
      ))}
      {preConnects.map(href => (
        <link rel="preconnect" href={href} crossOrigin="anonymous" />
      ))}
      <meta property="og:url" content={url || defaultUrl} />
      <meta name="twitter:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />
      {image ? <meta property="og:image" content={image} /> : undefined}
      {image ? <meta name="twitter:image" content={image} /> : undefined}
      <meta name="author" content={author} />
      <meta name="twitter:site" content={author} />
      <meta name="twitter:creator" content={author} />
      {children}
    </Helmet>
  )
}

export default SEO
