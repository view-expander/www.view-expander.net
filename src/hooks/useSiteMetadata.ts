import { graphql, useStaticQuery } from 'gatsby'
import { SiteMetadataQuery } from '../../graphql-types'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          author
          blogPostPagePath
          description
          facebookAppId
          imgixDomain
          instagram
          siteUrl
          tagsPagePath
          title
          twitter
          typekitId
          youtube
        }
      }
    }
  `)

  return site?.siteMetadata
}
