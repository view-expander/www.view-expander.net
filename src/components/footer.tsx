import React from 'react'
import styled from 'styled-components'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const StyledFooter = styled.footer`
  margin-top: 100px;
  text-align: center;
`

const Footer: React.FC = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <StyledFooter>
      <p>
        <small>Copyright {siteMetadata?.author}. All rights reserved.</small>
      </p>
    </StyledFooter>
  )
}

export default Footer
