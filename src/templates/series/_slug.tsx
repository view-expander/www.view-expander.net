import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import { graphql, Link, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { SeriesIndexPageQuery } from '../../../graphql-types'
import EffectedLink from '../../components/effected-link'
import Layout from '../../components/layout'
import NavHeading from '../../components/nav-heading'
import PostDate from '../../components/post-date'
import SEO from '../../components/seo'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { getPath, getPhotoAttributes, isString } from '../../libs'
import { getSharingPhotoPath } from '../../libs/imgix'

const THUMB_RECT = 128

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

const PostArticle = styled.article`
  margin-top: 100px;
`

const PostArticleLink = styled(Link)`
  display: flex;
  color: inherit;
  text-decoration: none;

  & > div:first-child {
    display: flex;
    width: ${THUMB_RECT}px;
    align-items: center;
    justify-content: center;
  }

  & > div + div {
    margin-left: 1rem;
  }

  h3 {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;

    &:after {
      will-change: left, right;
      content: '';
      position: absolute;
      bottom: 1px;
      left: 50%;
      right: 50%;
      height: 1px;
      background-color: currentColor;
      transition: left 200ms ease-out, right 200ms ease-out;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  &:hover,
  &:active,
  &:focus {
    h3 {
      &:after {
        left: 0;
        right: 0;
      }
    }
  }
`

const SeriesItemsTemplate: React.FC<PageProps<SeriesIndexPageQuery>> = ({
  data,
}) => {
  const series = data.contentfulSeries
  const siteMetadata = useSiteMetadata()

  if (!series) {
    return null
  }

  const featuredPhoto = data.allContentfulBlogPost.edges
    .flatMap(({ node }) => node.pictures || [])
    .find(item => item && item.featured)
  const image =
    featuredPhoto && isString(featuredPhoto.key)
      ? getSharingPhotoPath(featuredPhoto.key)
      : undefined

  return (
    <Layout>
      <SEO image={image} title={`Series / ${series.name}`} />
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
      {data.allContentfulBlogPost.edges.map(({ node }) => {
        if (!node) {
          return undefined
        }

        const { height, key, width } =
          node.pictures.find(item => item && item.featured) || node.pictures[0]
        const thumbAttrs = getPhotoAttributes(
          { height, key, width },
          {
            w: THUMB_RECT,
            h: THUMB_RECT,
          }
        )
        const mag =
          THUMB_RECT /
          (thumbAttrs.aspectRatio < 1 ? thumbAttrs.width : thumbAttrs.height)

        return (
          <PostArticle key={node.slug}>
            <PostArticleLink
              to={getPath(undefined, siteMetadata?.blogPostPagePath, node.slug)}
            >
              <div>
                <img
                  src={thumbAttrs.src}
                  srcSet={thumbAttrs.srcSet}
                  width={thumbAttrs.width * mag}
                  height={thumbAttrs.height * mag}
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div>
                <h3>{node.title}</h3>
                <PostDate value={node.date} />
              </div>
            </PostArticleLink>
          </PostArticle>
        )
      })}
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
