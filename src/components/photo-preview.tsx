import React from 'react'
import styled from 'styled-components'
import { createPhotoPath, imgixClient } from '../libs'

type Props = {
  meta: PhotoMeta
}

type ImgAttrs = {
  aspectRatio: number
}

const WIDTHS = [543, 688, 928, 1288]

const Img = styled.img.attrs<ImgAttrs>(attrs => attrs)<ImgAttrs>`
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

const PhotoPreview: React.FC<Props> = ({ meta }) => {
  if (imgixClient) {
    const { height, key, width } = meta
    const aspectRatio = height / width
    const srcset = imgixClient.buildSrcSet(
      createPhotoPath(key),
      {
        auto: 'format',
        fit: 'clip',
        colorquant: 2,
        sat: -100,
        gam: -80,
        blur: 20,
      },
      {
        widths:
          aspectRatio > 1
            ? WIDTHS.map(w => Math.ceil(w / aspectRatio))
            : WIDTHS,
      }
    )

    return (
      <Img
        alt=""
        aria-hidden
        aspectRatio={aspectRatio}
        height={height}
        srcSet={srcset}
        width={width}
      />
    )
  }

  return null
}

export default PhotoPreview
