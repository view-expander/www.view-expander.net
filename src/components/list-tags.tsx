import React from 'react'
import styled from 'styled-components'
import { ContentfulTag, Maybe } from '../../graphql-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { getPath } from '../libs'
import EffectedLink from './effected-link'

const UL = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -0.5em;
  padding: 0;
  list-style: none;
  color: #6c757d;

  &:after {
    content: '';
    flex: auto;
  }
`

const LI = styled.li`
  display: inline-block;
  margin-left: 0.5em;
`

const TagsLink = styled(EffectedLink)`
  &:before {
    content: '#';
  }
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
              <TagsLink
                to={getPath(undefined, siteMetadata?.tagsPagePath, item.slug)}
              >
                {item.name}
              </TagsLink>
            </LI>
          ) : undefined
        )}
    </UL>
  )
}

export default ListTags
