import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { PHOTO_STATUS, PhotoStatusKey } from '../hooks/usePhotoStatus'
import { isString } from '../libs'
import PhotoImage from './photo-image'

type Props = PhotoAttrs & {
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

  [data-browser='ie11'] & {
    display: none;

    &.is--stable {
      display: block;
    }
  }
`

const PhotoHiRes: React.FC<Props> = ({
  aspectRatio,
  height,
  onLoading,
  onLoaded,
  onStable,
  src,
  srcSet,
  status,
  width,
}) => {
  const isEmpty = status === PHOTO_STATUS.EMPTY
  const isLoaded = status === PHOTO_STATUS.LOADED
  const isLoading = status === PHOTO_STATUS.LOADING
  const isStable = status === PHOTO_STATUS.STABLE
  const onTransitionEnd = useCallback(() => onStable(), [onStable])
  const props = {
    aspectRatio,
    height,
    isLoaded,
    isStable,
    onTransitionEnd,
    src,
    srcSet,
    width,
  }

  useEffect(() => {
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
      {...props}
    />
  ) : null
}

export default PhotoHiRes
