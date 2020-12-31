import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import { graphql, Link, PageProps } from 'gatsby'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { SeriesItemsQuery } from '../../../graphql-types'
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`

const PostArticle = styled.article`
  content-visibility: auto;
  contain-intrinsic-size: ${THUMB_RECT}px;
  width: calc(100% - 1rem);
  margin-top: 50px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  @media (min-width: 768px) {
    width: calc(50% - 1rem);
  }

  @media (min-width: 992px) {
    width: calc(33% - 1rem);
  }

  @media (min-width: 1200px) {
    width: calc(25% - 1rem);
  }
`

const PostArticleLink = styled(Link)`
  display: flex;
  color: inherit;
  text-decoration: none;

  & > div:first-child {
    display: flex;
    width: ${THUMB_RECT}px;
    height: ${THUMB_RECT}px;
    align-items: flex-start;
    justify-content: center;
  }

  & > div + div {
    margin-left: 0.5rem;
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

const useThumb = (
  pictures: Required<
    ArrayElement<SeriesItemsQuery['allContentfulBlogPost']['edges']>['node']
  >['pictures']
) => {
  const item =
    Array.isArray(pictures) && pictures.length > 0
      ? pictures.find(item => item && item.featured) || pictures[0]
      : undefined

  if (!item) {
    return
  }

  const height = Number(item.height)
  const width = Number(item.width)
  const { key } = item
  const attrs =
    Number.isFinite(height) && Number.isFinite(width) && key
      ? getPhotoAttributes(
          { height, key, width },
          {
            w: THUMB_RECT,
            h: THUMB_RECT,
          }
        )
      : undefined
  const mag = attrs
    ? THUMB_RECT / (attrs.aspectRatio < 1 ? attrs.width : attrs.height)
    : 1

  return attrs
    ? {
        src: attrs.src,
        srcSet: attrs.srcSet,
        width: attrs.width * mag,
        height: attrs.height * mag,
      }
    : undefined
}

const ThumbSkeleton: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => (
  <svg
    viewBox={`${0} ${0} ${width} ${height}`}
    width={width}
    height={height}
    role={`img`}
    aria-hidden
  >
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={`#6c757d`}
      fillOpacity={0.5}
      stroke={`none`}
    />
  </svg>
)

const SeriesItem: React.FC<Required<
  ArrayElement<SeriesItemsQuery['allContentfulBlogPost']['edges']>['node']
>> = ({ date, pictures, slug, title }) => {
  const siteMetadata = useSiteMetadata()
  const thumb = useThumb(pictures)
  const [ref, inView] = useInView({
    threshold: 0.33,
    triggerOnce: true,
  })

  return (
    <PostArticle key={slug} ref={ref}>
      <PostArticleLink
        to={getPath(undefined, siteMetadata?.blogPostPagePath, slug)}
      >
        <div>
          {thumb ? (
            inView ? (
              <img {...thumb} alt="" loading="lazy" />
            ) : (
              <ThumbSkeleton width={thumb.width} height={thumb.height} />
            )
          ) : undefined}
        </div>
        <div>
          <h3>{title}</h3>
          <PostDate value={date} />
        </div>
      </PostArticleLink>
    </PostArticle>
  )
}

const SeriesItemsTemplate: React.FC<PageProps<SeriesItemsQuery>> = ({
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
      <Wrapper>
        {data.allContentfulBlogPost.edges.map(({ node }) =>
          node.slug && node.title ? (
            <SeriesItem
              key={node.slug}
              date={node.date}
              slug={node.slug}
              title={node.title}
              pictures={node.pictures || []}
            />
          ) : undefined
        )}
      </Wrapper>
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
