import { graphql, useStaticQuery } from 'gatsby'
import { SiteMetadataQuery } from '../../graphql-types'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          author
          description
          instagram
          title
          twitter
        }
      }
    }
  `)

  return site?.siteMetadata
}
