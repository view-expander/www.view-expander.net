import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { IndexPageQuery } from '../../graphql-types'

const IndexPage: React.FC<PageProps<IndexPageQuery>> = ({ data }) => (
  <div>
    <h1>View Expander</h1>
    {data.allContentfulBlogPost.edges.map(({ node }) => (
      <article key={node.slug}>
        <h2>{node.title}</h2>
        <p>
          <small>{node.slug}</small>
        </p>
        <p>
          <time dateTime={node.date}>{node.date}</time>
        </p>
        <ul>
          {node.pictures?.map(item =>
            item ? (
              <li key={item.key}>
                {item.key}: {item.width}x{item.height}
              </li>
            ) : undefined
          )}
        </ul>
        {node.body &&
        node.body.childMarkdownRemark &&
        node.body.childMarkdownRemark.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: node.body.childMarkdownRemark.html,
            }}
          />
        ) : undefined}
        <ul>
          {node.tags?.map(item =>
            item ? (
              <li key={item.slug}>
                {item.name}
                <small>({item.slug})</small>
              </li>
            ) : undefined
          )}
        </ul>
      </article>
    ))}
  </div>
)

export const query = graphql`
  query IndexPage {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          slug
          date(locale: "ja-jp")
          pictures {
            height
            key
            width
          }
          tags {
            name
            slug
          }
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`

export default IndexPage
