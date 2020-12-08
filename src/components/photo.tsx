import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  meta: PhotoMeta
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 80px;

  &:first-child {
    margin-top: 0;
  }
`

const Photo: React.FC<Props> = ({ meta }) => {
  const [status] = useState<0 | 1 | 2>(0)

  return (
    <Wrapper>
      {status === 0 ? `${meta.key}: ${meta.width}x${meta.height}` : undefined}
    </Wrapper>
  )
}

export default Photo
