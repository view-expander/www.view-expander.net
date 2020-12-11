import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import React from 'react'
import styled from 'styled-components'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import YouTubeIcon from '@material-ui/icons/YouTube'

const StyledFooter = styled.footer`
  margin-top: 100px;
`

const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const SNSAccounts = styled.div`
  display: inline-flex;
  justify-content: space-between;
`

const LinkToSNS = styled.a.attrs(attrs => ({ ...attrs, target: '_blank' }))`
  will-change: color;
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: #6c757d;
  text-decoration: none;
  transition: color 200ms ease-out;

  svg {
    will-change: transform;
    vertical-align: top;
    transform: scale(0.75, 0.75);
    transform-origin: 50% 50%;
    transition: transform 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    color: inherit;

    svg {
      transform: scale(1, 1);
    }
  }
`

const CopyRights = styled.p`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
`

const Footer: React.FC = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <StyledFooter>
      <FooterRow>
        <SNSAccounts>
          <LinkToSNS
            href={`https://www.instagram.com/${siteMetadata?.instagram}`}
          >
            <InstagramIcon style={{ fontSize: 32 }} />
          </LinkToSNS>
          <LinkToSNS
            href={`https://www.youtube.com/channel/${siteMetadata?.youtube}`}
          >
            <YouTubeIcon style={{ fontSize: 32 }} />
          </LinkToSNS>
          <LinkToSNS href={`https://twitter.com/${siteMetadata?.twitter}`}>
            <TwitterIcon style={{ fontSize: 32 }} />
          </LinkToSNS>
        </SNSAccounts>
      </FooterRow>
      <FooterRow>
        <CopyRights>
          <small>Copyright {siteMetadata?.author}. All rights reserved.</small>
        </CopyRights>
      </FooterRow>
    </StyledFooter>
  )
}

export default Footer
