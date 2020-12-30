import React from 'react'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import styled from 'styled-components'

const P = styled.p`
  display: flex;
  align-items: flex-end;
  line-height: 1rem;

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
}) =>
  name && slug ? (
    <P>
      <Icon />
      <small>{name}</small>
    </P>
  ) : null

export default PostSeries
