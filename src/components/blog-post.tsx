import React from 'react'
import styled from 'styled-components'
import { IndexPageQuery } from '../../graphql-types'
import PostDate from './PostDate'

type Props = Omit<
  Required<
    ArrayElement<IndexPageQuery['allContentfulBlogPost']['edges']>['node']
  >,
  'slug'
>

const Article = styled.article`
  margin-top: 100px;
`

const Header = styled.header`
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

const BlogPost: React.FC<Props> = ({ body, date, pictures, tags, title }) => (
  <Article>
    <Header>
      <h2>{title}</h2>
      <PostDate value={date} />
    </Header>
    {pictures && pictures.length > 0 ? (
      <ul>
        {pictures.map(item =>
          item ? (
            <li key={item.key}>
              {item.key}: {item.width}x{item.height}
            </li>
          ) : undefined
        )}
      </ul>
    ) : undefined}
    {body && body.childMarkdownRemark && body.childMarkdownRemark.html ? (
      <div
        dangerouslySetInnerHTML={{
          __html: body.childMarkdownRemark.html,
        }}
      />
    ) : undefined}
    {tags && tags.length > 0 ? (
      <ul>
        {tags.map(item =>
          item ? (
            <li key={item.slug}>
              {item.name}
              <small>({item.slug})</small>
            </li>
          ) : undefined
        )}
      </ul>
    ) : undefined}
  </Article>
)

export default BlogPost
