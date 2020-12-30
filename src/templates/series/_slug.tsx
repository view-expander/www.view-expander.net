import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { SeriesIndexPageQuery } from '../../../graphql-types'
import EffectedLink from '../../components/effected-link'
import Layout from '../../components/layout'
import NavHeading from '../../components/nav-heading'
import SEO from '../../components/seo'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { getPath } from '../../libs'

const Separator = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const CurrentSeries = styled.strong`
  display: inline-flex;
  font-weight: 500;
`

const Icon = styled(CollectionsBookmarkIcon).attrs(attrs => ({
  ...attrs,
  'aria-hidden': true,
  style: { fontSize: '1.333rem' },
}))`
  display: inline-block;
  margin-right: 0.25em;
`

const SeriesItemsTemplate: React.FC<PageProps<SeriesIndexPageQuery>> = ({
  data,
}) => {
  const series = data.contentfulSeries
  const siteMetadata = useSiteMetadata()

  if (!series) {
    return null
  }

  return (
    <Layout>
      <SEO title={`Series / ${series.name}`} />
      <NavHeading>
        <EffectedLink to={getPath(undefined, siteMetadata?.seriesPagePath)}>
          Series
        </EffectedLink>
        <Separator aria-hidden>/</Separator>
        <CurrentSeries>
          <Icon />
          {series.name}
        </CurrentSeries>
      </NavHeading>
    </Layout>
  )
}

export const query = graphql`
  query SeriesItems($slug: String!) {
    contentfulSeries(slug: { eq: $slug }) {
      name
      slug
    }
    allContentfulBlogPost(
      sort: { fields: date, order: ASC }
      filter: { series: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          slug
          title
          date
          pictures {
            featured
            height
            key
            width
          }
        }
      }
    }
  }
`

export default SeriesItemsTemplate
