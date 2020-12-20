import React from 'react'
import styled from 'styled-components'
import {
  BlogPostQuery,
  IndexPageQuery,
  TagItemsQuery,
} from '../../graphql-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { getPath } from '../libs'
import ContentHeader from './content-header'
import EffectedLink from './effected-link'
import ListTags from './list-tags'
import Pictures from './pictures'
import PostDate from './post-date'

type Props = Required<
  ArrayElement<IndexPageQuery['allContentfulBlogPost']['edges']>['node'] &
    ArrayElement<TagItemsQuery['allContentfulBlogPost']['edges']>['node'] &
    BlogPostQuery['contentfulBlogPost']
> & {
  permanent?: boolean
}

const PostArticle = styled.article`
  display: grid;
  column-gap: 1rem;
  margin-top: 100px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 33.33%;
  }
`

const PostBody = styled.div`
  will-change: opacity;
  opacity: 0;
  margin-top: 50px;
  text-align: justify;
  transition: opacity 200ms ease-out 100ms;

  .wf-loading & {
    opacity: 0;
  }

  .wf-active &,
  .wf-inactive & {
    opacity: 1;
  }

  & > :first-child {
    margin-top: 0;
  }

  &:last-child {
    grid-column: 1 / -1;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const PostHeader = styled(ContentHeader)`
  grid-column: 1 / -1;
`

const PostLink = styled(EffectedLink)`
  color: inherit;
`

const PostPictures = styled.div`
  will-change: opacity;
  opacity: 0;
  grid-column: 1 / -1;
  margin-top: 50px;
  transition: opacity 200ms ease-out 100ms;

  .wf-loading & {
    opacity: 0;
  }

  .wf-active &,
  .wf-inactive & {
    opacity: 1;
  }
`

const PostTags = styled.footer`
  will-change: opacity;
  opacity: 0;
  margin-top: 1rem;
  transition: opacity 200ms ease-out 100ms;

  .wf-loading & {
    opacity: 0;
  }

  .wf-active &,
  .wf-inactive & {
    opacity: 1;
  }

  @media (min-width: 992px) {
    margin-top: 50px;
  }

  &:nth-child(3) {
    grid-column: 1 / -1;
    margin-top: 50px;
  }
`

const BlogPost: React.FC<Props> = ({
  body,
  date,
  permanent = true,
  pictures,
  slug,
  tags,
  title,
}) => {
  const siteMetadata = useSiteMetadata()

  return (
    <PostArticle>
      <PostHeader>
        <h2>
          {permanent || !slug ? (
            title
          ) : (
            <PostLink
              to={getPath(undefined, siteMetadata?.blogPostPagePath, slug)}
            >
              {title}
            </PostLink>
          )}
        </h2>
        <PostDate value={date} />
      </PostHeader>
      {pictures && pictures.length > 0 ? (
        <PostPictures>
          <Pictures
            value={pictures.reduce<PhotoMeta[]>((memo, item) => {
              if (!item || !item.key) {
                return memo
              }

              const { height, key, width } = item

              return [
                ...memo,
                {
                  height: Math.max(height || 0, 0),
                  key,
                  width: Math.max(width || 0, 0),
                },
              ]
            }, [])}
          />
        </PostPictures>
      ) : undefined}
      {body && body.childMarkdownRemark && body.childMarkdownRemark.html ? (
        <PostBody
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html,
          }}
        />
      ) : undefined}
      {Array.isArray(tags) && tags.length > 0 ? (
        <PostTags>
          <ListTags value={tags} />
        </PostTags>
      ) : undefined}
    </PostArticle>
  )
}

export default BlogPost
