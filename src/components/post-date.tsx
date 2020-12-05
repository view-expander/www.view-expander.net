import { format } from 'date-fns'
import React from 'react'
import styled from 'styled-components'

const P = styled.p`
  time {
    color: #6c757d;
  }
`

const PostDate: React.FC<{ value: string }> = ({ value }) => (
  <P>
    <time dateTime={value}>{format(new Date(value), 'yyyy-MM-dd')}</time>
  </P>
)

export default PostDate
