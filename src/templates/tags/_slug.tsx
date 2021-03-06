import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { TagItemsQuery } from '../../../graphql-types'
import BlogPost from '../../components/blog-post'
import EffectedLink from '../../components/effected-link'
import Layout from '../../components/layout'
import NavFooting from '../../components/nav-footing'
import NavHeading from '../../components/nav-heading'
import SEO from '../../components/seo'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { getPath, isString, isStringOfNotEmpty } from '../../libs'
import { getSharingPhotoPath } from '../../libs/imgix'
import { PaginatedPageProps } from '../models'

const Separator = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const CurrentTag = styled.strong`
  display: inline-block;
  font-weight: 500;

  &:before {
    content: '#';
  }
`

const TagItemsTemplate: React.FC<PaginatedPageProps<TagItemsQuery>> = ({
  data,
  pageContext,
}) => {
  const tag = data.contentfulTag
  const siteMetadata = useSiteMetadata()

  if (!tag) {
    return null
  }

  const featuredPhoto = data.allContentfulBlogPost.edges
    .flatMap(({ node }) => node.pictures || [])
    .find(item => item && item.featured)
  const image =
    featuredPhoto && isString(featuredPhoto.key)
      ? getSharingPhotoPath(featuredPhoto.key)
      : undefined
  const newer = isStringOfNotEmpty(pageContext.previousPagePath)
    ? { path: getPath(undefined, pageContext.previousPagePath) }
    : undefined
  const older = isStringOfNotEmpty(pageContext.nextPagePath)
    ? { path: getPath(undefined, pageContext.nextPagePath) }
    : undefined

  return (
    <Layout>
      <SEO image={image} title={`Tags / ${tag.name}`} />
      <NavHeading>
        <EffectedLink to={getPath(undefined, siteMetadata?.tagsPagePath)}>
          Tags
        </EffectedLink>
        <Separator aria-hidden>/</Separator>
        <CurrentTag>{tag.name}</CurrentTag>
      </NavHeading>
      {data.allContentfulBlogPost.edges.map(({ node }) =>
        node ? (
          <BlogPost
            key={node.slug}
            body={node.body || null}
            date={node.date}
            permanent={false}
            pictures={node.pictures || []}
            series={node.series || null}
            slug={node.slug || null}
            tags={node.tags || []}
            title={node.title || null}
          />
        ) : undefined
      )}
      <NavFooting newer={newer} older={older} />
    </Layout>
  )
}

export const query = graphql`
  query TagItems($slug: String!, $skip: Int!, $limit: Int!) {
    contentfulTag(slug: { eq: $slug }) {
      name
      slug
    }
    allContentfulBlogPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          body {
            childMarkdownRemark {
              html
            }
          }
          date(locale: "ja-jp")
          pictures {
            featured
            height
            key
            width
          }
          series {
            name
            slug
          }
          slug
          tags {
            name
            slug
          }
          title
        }
      }
    }
  }
`

export default TagItemsTemplate
