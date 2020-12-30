import React from 'react'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import styled from 'styled-components'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { getPath } from '../libs'
import EffectedLink from './effected-link'

const P = styled.p`
  color: #6c757d;
  line-height: 1rem;

  a {
    display: flex;
    align-items: flex-end;
    color: inherit;
  }

  small {
    font-size: 0.75rem;
  }
`

const Icon = styled(CollectionsBookmarkIcon).attrs(attrs => ({
  ...attrs,
  'aria-hidden': true,
  style: { fontSize: '1rem' },
}))`
  display: inline-block;
  margin-right: 0.25em;
`

const PostSeries: React.FC<{ name?: string | null; slug?: string | null }> = ({
  name,
  slug,
}) => {
  const siteMetadata = useSiteMetadata()

  return name && slug ? (
    <P>
      <EffectedLink to={getPath(undefined, siteMetadata?.seriesPagePath, slug)}>
        <Icon />
        <small>{name}</small>
      </EffectedLink>
    </P>
  ) : null
}

export default PostSeries
