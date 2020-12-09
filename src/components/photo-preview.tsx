import React from 'react'
import { getImageSources } from '../libs'
import PhotoImage from './photo-image'

type Props = {
  meta: PhotoMeta
}

const PhotoPreview: React.FC<Props> = ({ meta }) => {
  const { height, key, width } = meta
  const aspectRatio = height / width
  const { src, srcSet } = getImageSources(key, aspectRatio, {
    colorquant: 2,
    sat: -100,
    gam: -90,
    blur: 20,
  })

  return (
    <PhotoImage
      alt=""
      aria-hidden
      {...{ aspectRatio, height, src, srcSet, width }}
    />
  )
}

export default PhotoPreview
