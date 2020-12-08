import React from 'react'
import styled from 'styled-components'
import { IndexPageQuery } from '../../graphql-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import ContentHeader from './content-header'
import EffectedLink from './effected-link'
import ListTags from './list-tags'
import Pictures from './pictures'
import PostDate from './post-date'

type Props = Required<
  ArrayElement<IndexPageQuery['allContentfulBlogPost']['edges']>['node']
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
  margin-top: 50px;
  text-align: justify;

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
  grid-column: 1 / -1;
  margin-top: 50px;
`

const PostTags = styled.footer`
  margin-top: 1rem;

  @media (min-width: 992px) {
    margin-top: 50px;
  }

  &:nth-child(3) {
    grid-column: 1 / -1;
    margin-top: 50px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: -0.5em;
    padding: 0;
    list-style: none;
    color: #6c757d;
  }

  li {
    display: inline-block;
    margin-left: 0.5em;
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
            <PostLink to={`/${siteMetadata?.blogPostPagePath}/${slug}`}>
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
