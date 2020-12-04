import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { IndexPageQuery } from '../../graphql-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import PostDate from './PostDate'

type Props = Required<
  ArrayElement<IndexPageQuery['allContentfulBlogPost']['edges']>['node']
> & {
  permanent?: boolean
}

const PostArticle = styled.article`
  margin-top: 100px;
`

const PostBody = styled.section`
  text-align: justify;

  & > :first-child {
    margin-top: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const PostDetail = styled.div.attrs<{ grid: boolean }>(({ grid }) => ({
  grid,
}))<{
  grid: boolean
}>`
  display: ${({ grid }) => (grid ? `grid` : `block`)};
  gap: 1rem;
  margin-top: 50px;

  @media (min-width: 992px) {
    grid-template-columns: 66.67% 1fr;
  }
`

const PostHeader = styled.header`
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.6rem;
    font-weight: 500;

    @media (min-width: 992px) {
      font-size: 2rem;
    }
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`

const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const PostTags = styled.footer`
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

    &:before {
      content: '#';
    }
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
            <PostLink to={`${siteMetadata?.blogPostPagePath}/${slug}`}>
              {title}
            </PostLink>
          )}
        </h2>
        <PostDate value={date} />
      </PostHeader>
      {pictures && pictures.length > 0 ? (
        <section>
          <ul>
            {pictures.map(item =>
              item ? (
                <li key={item.key}>
                  {item.key}: {item.width}x{item.height}
                </li>
              ) : undefined
            )}
          </ul>
        </section>
      ) : undefined}
      <PostDetail grid={Boolean(body)}>
        {body && body.childMarkdownRemark && body.childMarkdownRemark.html ? (
          <PostBody
            dangerouslySetInnerHTML={{
              __html: body.childMarkdownRemark.html,
            }}
          />
        ) : undefined}
        {tags && tags.length > 0 ? (
          <PostTags>
            <ul>
              {tags
                .sort((a, b) =>
                  a?.slug && b?.slug ? (a.slug < b.slug ? -1 : 1) : 0
                )
                .map(item =>
                  item ? (
                    <li key={item.slug}>
                      <a href={`#${item.slug}`}>{item.name}</a>
                    </li>
                  ) : undefined
                )}
            </ul>
          </PostTags>
        ) : undefined}
      </PostDetail>
    </PostArticle>
  )
}

export default BlogPost
