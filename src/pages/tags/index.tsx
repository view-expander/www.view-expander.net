import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { ContentfulTag, TagsIndexPageQuery } from '../../../graphql-types'
import Layout from '../../components/layout'
import ListTags from '../../components/list-tags'
import NavHeading from '../../components/nav-heading'
import SEO from '../../components/seo'

const Wrapper = styled.div`
  margin-top: 100px;
`

const TagsIndexPage: React.FC<PageProps<TagsIndexPageQuery>> = ({ data }) => (
  <Layout>
    <SEO title={`Tags`} />
    <NavHeading>Tags</NavHeading>
    <Wrapper>
      <ListTags
        value={data.allContentfulTag.edges.reduce<
          Pick<ContentfulTag, 'name' | 'slug'>[]
        >((memo, item) => {
          if (!item) {
            return memo
          }

          const { name, slug } = item.node

          return [...memo, { name, slug }]
        }, [])}
      />
    </Wrapper>
  </Layout>
)

export const query = graphql`
  query TagsIndexPage {
    allContentfulTag(sort: { fields: name }) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`

export default TagsIndexPage
