import { Link } from 'gatsby'
import styled from 'styled-components'

const EffectedLink = styled(Link).attrs<{ color?: string }>(
  ({ color = 'currentColor' }) => ({ color })
)<{ color?: string }>`
  position: relative;
  display: inline-block;
  color: ${({ color }) => color};
  text-decoration: none;

  &:after {
    will-change: left, right;
    content: '';
    position: absolute;
    bottom: 1px;
    left: 50%;
    right: 50%;
    height: 1px;
    background-color: ${({ color }) => color};
    transition: left 200ms ease-out, right 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    &:after {
      left: 0;
      right: 0;
    }
  }
`

export default EffectedLink
