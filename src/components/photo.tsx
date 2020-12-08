import React from 'react'
import styled from 'styled-components'
import PhotoPreview from './photo-preview'

type Props = {
  inView?: boolean
  meta: PhotoMeta
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  &:first-child {
    margin-top: 0;
  }
`

const Photo: React.FC<Props> = ({ inView, meta }) => (
  <Wrapper>
    {Boolean(inView) ? (
      `${meta.key}: ${meta.width}x${meta.height}`
    ) : (
      <PhotoPreview meta={meta} />
    )}
  </Wrapper>
)

export default Photo
