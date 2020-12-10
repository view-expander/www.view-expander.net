import styled from 'styled-components'

type ImgAttrs = {
  aspectRatio: number
}

const PhotoImage = styled.img.attrs<ImgAttrs>(attrs => ({
  ...attrs,
  alt: '',
}))<ImgAttrs>`
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
    width: cal(1140px - 2rem);
    height: calc((1140px - 2rem) * ${({ aspectRatio }) => aspectRatio});
    max-width: 95vh;
    max-height: calc(95vh * ${({ aspectRatio }) => aspectRatio});
  }

  @media (min-width: 1400px) {
    width: cal(1320px - 2rem);
    height: calc((1320px - 2rem) * ${({ aspectRatio }) => aspectRatio});
  }
`

export default PhotoImage
