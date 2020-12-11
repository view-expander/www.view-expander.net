import React from 'react'
import styled from 'styled-components'
import EffectedLink from './effected-link'

type Item = {
  path: string
  title?: string | null
}

type Props = {
  newer?: Item
  older?: Item
}

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 100px;
  color: #6c757d;
`

const Item = styled.div`
  display: flex;
`

const Newer = styled(Item)`
  grid-column: 1;
  justify-content: flex-start;
`

const Home = styled(Item)`
  grid-column: 2;
  justify-content: center;
`

const Older = styled(Item)`
  grid-column: 3;
  justify-content: flex-end;
`

const NavFooting: React.FC<Props> = ({ newer, older }) => (
  <Nav>
    {newer ? (
      <Newer>
        <EffectedLink to={newer.path}>{newer.title || 'Newer'}</EffectedLink>
      </Newer>
    ) : undefined}
    <Home>
      <EffectedLink to="/">Home</EffectedLink>
    </Home>
    {older ? (
      <Older>
        <EffectedLink to={older.path}>{older.title || 'Older'}</EffectedLink>
      </Older>
    ) : undefined}
  </Nav>
)

export default NavFooting
