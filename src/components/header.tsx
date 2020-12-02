import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const StyledHeader = styled.header`
  text-align: center;

  h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 4rem;
    font-weight: inherit;

    @media (min-width: 576px) {
      font-size: 5rem;
    }

    @media (min-width: 992px) {
      font-size: 6rem;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const Header: React.FC = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <StyledHeader>
      <h1>
        <Link to="/">{siteMetadata?.title}</Link>
      </h1>
    </StyledHeader>
  )
}

export default Header
