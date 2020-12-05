import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.6rem;
    font-weight: 500;

    @media (min-width: 992px) {
      font-size: 2rem;
    }
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`

const ContentHeader: React.FC = ({ children }) => <Header>{children}</Header>

export default ContentHeader
