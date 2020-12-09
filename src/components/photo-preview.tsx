import React from 'react'
import { createPhotoPath, imgixClient } from '../libs'
import PhotoImage from './photo-image'

type Props = {
  meta: PhotoMeta
}

const WIDTHS = [543, 688, 928, 1288]

const PhotoPreview: React.FC<Props> = ({ meta }) => {
  if (imgixClient) {
    const { height, key, width } = meta
    const aspectRatio = height / width
    const src = imgixClient.buildURL(createPhotoPath(key), {
      auto: 'format',
      fit: 'clip',
      colorquant: 2,
      sat: -100,
      gam: -80,
      blur: 20,
      w: WIDTHS[WIDTHS.length - 1],
      h: WIDTHS[WIDTHS.length - 1],
    })
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
      <PhotoImage
        alt=""
        aria-hidden
        aspectRatio={aspectRatio}
        height={height}
        src={src}
        srcSet={srcset}
        width={width}
      />
    )
  }

  return null
}

export default PhotoPreview
