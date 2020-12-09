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
  position: relative;
  margin-top: 80px;

  &:first-child {
    margin-top: 0;
  }
`

const P = styled.p`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Photo: React.FC<Props> = ({ inView, meta }) => (
  <Wrapper>
    <PhotoPreview meta={meta} />
    {Boolean(inView) ? (
      <P>
        {meta.key}: {meta.width}x{meta.height}
      </P>
    ) : undefined}
  </Wrapper>
)

export default Photo
