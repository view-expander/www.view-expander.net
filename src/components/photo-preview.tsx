import React from 'react'
import { getPhotoAttributes } from '../libs'
import PhotoImage from './photo-image'

type Props = {
  meta: PhotoMeta
}

const PhotoPreview: React.FC<Props> = ({ meta }) => (
  <PhotoImage
    aria-hidden
    {...getPhotoAttributes(meta, {
      colorquant: 2,
      sat: -100,
      gam: -90,
      blur: 20,
    })}
  />
)

export default PhotoPreview
