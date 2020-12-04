import React from 'react'
import { IndexPageQuery } from '../../graphql-types'

type Props = Omit<
  Required<
    ArrayElement<IndexPageQuery['allContentfulBlogPost']['edges']>['node']
  >,
  'slug'
>

const BlogPost: React.FC<Props> = ({ body, date, pictures, tags, title }) => (
  <article>
    <h2>{title}</h2>
    <div>
      <time dateTime={date}>{date}</time>
    </div>
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
  </article>
)

export default BlogPost
