import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  will-change: opacity;
  opacity: 0;
  transition: opacity 200ms ease-out 100ms;

  .wf-loading & {
    opacity: 0;
  }

  .wf-active &,
  .wf-inactive & {
    opacity: 1;
  }

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
