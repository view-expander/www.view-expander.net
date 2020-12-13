import styled from 'styled-components'

type ImgAttrs = {
  aspectRatio: number
}

const getWidthMag = ({ aspectRatio }: ImgAttrs) =>
  aspectRatio <= 1 ? 1 : 1 / aspectRatio
const getHeightMag = ({ aspectRatio }: ImgAttrs) =>
  aspectRatio <= 1 ? aspectRatio : 1

const PhotoImage = styled.img.attrs<ImgAttrs>(attrs => ({
  ...attrs,
  alt: '',
}))<ImgAttrs>`
  object-fit: contain;
  display: block;
  max-width: calc((100vw - 2rem) * ${getWidthMag});
  max-height: calc((100vw - 2rem) * ${getHeightMag});

  @media (min-width: 576px) {
    max-width: calc((540px - 2rem) * ${getWidthMag});
    max-height: calc((540px - 2rem) * ${getHeightMag});
  }

  @media (min-width: 768px) {
    max-width: calc((720px - 2rem) * ${getWidthMag});
    max-height: calc((720px - 2rem) * ${getHeightMag});
  }

  @media (min-width: 992px) {
    max-width: calc((960px - 2rem) * ${getWidthMag});
    max-height: calc((960px - 2rem) * ${getHeightMag});
  }

  @media (min-width: 1200px) {
    width: 95vh;
    height: 95vh;
    max-width: calc((1140px - 2rem) * ${getWidthMag});
    max-height: calc((1140px - 2rem) * ${getHeightMag});
  }

  @media (min-width: 1400px) {
    max-width: calc((1320px - 2rem) * ${getWidthMag});
    max-height: calc((1320px - 2rem) * ${getHeightMag});
  }
`

export default PhotoImage
