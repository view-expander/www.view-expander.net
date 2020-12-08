import React from 'react'
import styled from 'styled-components'

type Props = {
  meta: PhotoMeta
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 80px;
`

const Photo: React.FC<Props> = ({ meta }) => (
  <Wrapper>
    {meta.key}: {meta.width}x{meta.height}
  </Wrapper>
)

export default Photo
