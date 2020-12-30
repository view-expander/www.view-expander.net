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

const Wrapper = styled.div`
  margin-top: 100px;
`

const UL = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -0.5em;
  padding: 0;
  list-style: none;
  color: #6c757d;

  &:after {
    content: '';
    flex: auto;
  }
`

const LI = styled.li`
  margin-left: 0.5em;
  line-height: 1.333rem;

  a {
    display: inline-flex;
    align-items: center;
  }
`

const Icon = styled(CollectionsBookmarkIcon).attrs(attrs => ({
  ...attrs,
  'aria-hidden': true,
  style: { fontSize: '1.333rem' },
}))`
  display: inline-block;
  margin-right: 0.25em;
`

const SeriesIndexPage: React.FC<PageProps<SeriesIndexPageQuery>> = ({
  data,
}) => {
  const siteMetadata = useSiteMetadata()

  return (
    <Layout>
      <SEO title={`Series`} />
      <NavHeading>Series</NavHeading>
      <Wrapper>
        <UL>
          {data.allContentfulSeries.edges.map(({ node }) => (
            <LI key={node.slug}>
              <EffectedLink
                to={getPath(undefined, siteMetadata?.seriesPagePath, node.slug)}
              >
                <Icon />
                {node.name}
              </EffectedLink>
            </LI>
          ))}
        </UL>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query SeriesIndexPage {
    allContentfulSeries(sort: { fields: name }) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`

export default SeriesIndexPage
