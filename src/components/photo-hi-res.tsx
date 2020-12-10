import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { PHOTO_STATUS, PhotoStatusKey } from '../hooks/usePhotoStatus'
import { getPhotoAttributes, isString } from '../libs'
import PhotoImage from './photo-image'

type Props = {
  meta: PhotoMeta
  onLoading: () => any
  onLoaded: () => any
  onStable: () => any
  status: PhotoStatusKey
}

const StyledPhotoImage = styled(PhotoImage).attrs<{
  isLoaded: boolean
  isStable: boolean
}>(attrs => attrs)<{
  isLoaded: boolean
  isStable: boolean
}>`
  will-change: width, height, opacity;
  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms ease-out 200ms;

  &.is--loading,
  &.is--loaded {
    position: absolute;
  }

  &.is--loading,
  &.is--loaded,
  &.is--stable {
    visibility: visible;
  }

  &.is--loaded,
  &.is--stable {
    opacity: 1;
  }
`

const PhotoHiRes: React.FC<Props> = ({
  meta,
  onLoading,
  onLoaded,
  onStable,
  status,
}) => {
  const isEmpty = status === PHOTO_STATUS.EMPTY
  const isLoaded = status === PHOTO_STATUS.LOADED
  const isLoading = status === PHOTO_STATUS.LOADING
  const isStable = status === PHOTO_STATUS.STABLE
  const attrs = getPhotoAttributes(meta)
  const onTransitionEnd = useCallback(() => onStable(), [onStable])

  useEffect(() => {
    const { src, srcSet } = attrs

    if (!src || !srcSet) {
      return
    }

    if (isEmpty) {
      onLoading()

      const img = new Image()
      const isSrcSetSupported = isString(img.srcset)
      const onLoad = () => {
        img.removeEventListener('load', onLoad)

        if (!isSrcSetSupported) {
          img.src = src
        }

        onLoaded()
      }

      img.addEventListener('load', onLoad)

      if (isSrcSetSupported) {
        img.srcset = srcSet
      } else {
        img.src = src
      }
    }
  }, [onLoading, onLoaded, status])

  return isLoading || isLoaded || isStable ? (
    <StyledPhotoImage
      className={
        isLoading
          ? 'is--loading'
          : isLoaded
          ? 'is--loaded'
          : isStable
          ? 'is--stable'
          : undefined
      }
      {...getPhotoAttributes(meta)}
      isLoaded={isLoaded}
      isStable={isStable}
      onTransitionEnd={onTransitionEnd}
    />
  ) : null
}

export default PhotoHiRes
