import styled from 'styled-components'

type ImgAttrs = {
  aspectRatio: number
}

const PhotoImage = styled.img.attrs<ImgAttrs>(attrs => attrs)<ImgAttrs>`
  object-fit: contain;
  max-width: calc(100vw - 2rem);
  max-height: calc((100vw - 2rem) * ${({ aspectRatio }) => aspectRatio});

  @media (min-width: 576px) {
    max-width: calc(540px - 2rem);
    max-height: calc((540px - 2rem) * ${({ aspectRatio }) => aspectRatio});
  }

  @media (min-width: 768px) {
    max-width: calc(720px - 2rem);
    max-height: calc((720px - 2rem) * ${({ aspectRatio }) => aspectRatio});
  }

  @media (min-width: 992px) {
    max-width: calc(960px - 2rem);
    max-height: calc((960px - 2rem) * ${({ aspectRatio }) => aspectRatio});
  }

  @media (min-width: 1200px) {
    width: 100%;
    height: calc(100% * ${({ aspectRatio }) => aspectRatio});
    max-width: 95vh;
    max-height: calc(95vh * ${({ aspectRatio }) => aspectRatio});
  }
`

export default PhotoImage
