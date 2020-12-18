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

const createStyledSnsIcon = (component: Parameters<typeof styled>[0]) =>
  styled(component).attrs(attrs => ({
    ...attrs,
    style: { fontSize: 32 },
  }))`
    vertical-align: top;
  `

const StyledInstagramIcon = createStyledSnsIcon(InstagramIcon)
const StyledYouTubeIcon = createStyledSnsIcon(YouTubeIcon)
const StyledTwitterIcon = createStyledSnsIcon(TwitterIcon)

const LinkToSNS = styled.a.attrs(attrs => ({ ...attrs, target: '_blank' }))`
  margin-left: 8px;
  margin-right: 8px;
  padding: 8px;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
`

const LinkToInstagram = styled(LinkToSNS)`
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &:before {
    will-change: opacity;
    z-index: -1;
    background-color: #ffffff;
    transition: opacity 200ms ease-out;
  }

  &:after {
    z-index: -2;
    background: linear-gradient(
      45deg,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
    border-radius: 9px;
  }

  ${StyledInstagramIcon} {
    will-change: fill;
    fill: currentColor;
    transition: fill 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    &:before {
      opacity: 0;
    }

    ${StyledInstagramIcon} {
      will-change: fill;
      fill: #ffffff;
      transition: fill 200ms ease-out;
    }
  }
`

const LinkToYouTube = styled(LinkToSNS)`
  ${StyledYouTubeIcon} {
    will-change: fill;
    fill: currentColor;
    transition: fill 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    ${StyledYouTubeIcon} {
      fill: #ff0000;
    }
  }
`

const LinkToTwitter = styled(LinkToSNS)`
  will-change: background-color;
  background-color: #ffffff;
  transition: background-color 200ms ease-out;

  ${StyledTwitterIcon} {
    will-change: fill;
    fill: currentColor;
    transition: fill 200ms ease-out;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #1da1f2;

    ${StyledTwitterIcon} {
      fill: #ffffff;
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
          <LinkToInstagram
            href={`https://www.instagram.com/${siteMetadata?.instagram}`}
          >
            <StyledInstagramIcon titleAccess="Instagram" />
          </LinkToInstagram>
          <LinkToYouTube
            href={`https://www.youtube.com/channel/${siteMetadata?.youtube}`}
          >
            <StyledYouTubeIcon titleAccess="YouTube" />
          </LinkToYouTube>
          <LinkToTwitter href={`https://twitter.com/${siteMetadata?.twitter}`}>
            <StyledTwitterIcon titleAccess="Twitter" />
          </LinkToTwitter>
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
