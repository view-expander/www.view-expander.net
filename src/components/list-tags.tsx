import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { ContentfulTag, Maybe } from '../../graphql-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -0.5em;
  padding: 0;
  list-style: none;
  color: #6c757d;
`

const LI = styled.li`
  position: relative;
  display: inline-block;
  margin-left: 0.5em;

  &:before {
    content: '#';
  }

  &:after {
    will-change: left, right;
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    right: 50%;
    height: 1px;
    background-color: #6c757d;
    transition: left 200ms ease-out, right 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    &:after {
      left: 0;
      right: 0;
    }
  }
`

const TagsLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const ListTags: React.FC<{
  value: Maybe<Pick<ContentfulTag, 'name' | 'slug'>>[]
}> = ({ value }) => {
  const siteMetadata = useSiteMetadata()

  return (
    <UL>
      {value
        .sort((a, b) => (a?.slug && b?.slug ? (a.slug < b.slug ? -1 : 1) : 0))
        .map(item =>
          item ? (
            <LI key={item.slug}>
              <TagsLink to={`/${siteMetadata?.tagsPagePath}/${item.slug}`}>
                {item.name}
              </TagsLink>
            </LI>
          ) : undefined
        )}
    </UL>
  )
}

export default ListTags
