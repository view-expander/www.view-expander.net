import HomeIcon from '@material-ui/icons/Home'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React from 'react'
import styled from 'styled-components'
import { isStringOfNotEmpty } from '../libs'
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
  grid-template-columns: 1fr 24px 1fr;
  column-gap: 1rem;
  margin-top: 100px;
  color: #6c757d;
`

const Item = styled.div`
  overflow: hidden;
  display: flex;

  svg {
    width: 24px;
    height: 24px;
    vertical-align: top;
  }
`

const ItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  small {
    display: block;
  }

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const NavLink = styled(EffectedLink)`
  display: inline-flex;
  align-items: flex-end;
  max-width: 100%;
`

const Newer = styled(Item)`
  grid-column: 1;
`

const Home = styled(Item)`
  grid-column: 2;
  justify-content: center;
`

const Older = styled(Item)`
  grid-column: 3;
  justify-content: flex-end;

  ${ItemTitle} {
    text-align: right;
  }

  ${NavLink} {
    justify-content: flex-end;
  }
`

const NavFooting: React.FC<Props> = ({ newer, older }) => (
  <Nav>
    {newer ? (
      <Newer>
        <NavLink to={newer.path}>
          <NavigateBeforeIcon />
          {isStringOfNotEmpty(newer.title) ? (
            <ItemTitle>
              <small>Newer</small>
              <div>{newer.title}</div>
            </ItemTitle>
          ) : (
            <ItemTitle>
              <div>Newer</div>
            </ItemTitle>
          )}
        </NavLink>
      </Newer>
    ) : undefined}
    <Home>
      <NavLink to="/">
        <HomeIcon titleAccess="home" />
      </NavLink>
    </Home>
    {older ? (
      <Older>
        <NavLink to={older.path}>
          {isStringOfNotEmpty(older.title) ? (
            <ItemTitle>
              <small>Older</small>
              <div>{older.title}</div>
            </ItemTitle>
          ) : (
            <ItemTitle>
              <div>Older</div>
            </ItemTitle>
          )}
          <NavigateNextIcon />
        </NavLink>
      </Older>
    ) : undefined}
  </Nav>
)

export default NavFooting
