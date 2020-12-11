import React from 'react'
import styled from 'styled-components'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
`

const CopyRights = styled.p`
  display: inline-block;
  margin-top: 50px;
  margin-bottom: 0;
  text-align: center;
`

const Footer: React.FC = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <StyledFooter>
      <CopyRights>
        <small>Copyright {siteMetadata?.author}. All rights reserved.</small>
      </CopyRights>
    </StyledFooter>
  )
}

export default Footer
