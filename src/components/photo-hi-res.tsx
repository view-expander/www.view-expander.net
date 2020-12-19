import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PHOTO_STATUS, PhotoStatusKey } from '../hooks/usePhotoStatus'
import { isString } from '../libs'
import PhotoImage from './photo-image'

type Props = PhotoAttrs & {
  onLoaded: () => any
  onLoading: () => any
  onStable: () => any
  status: PhotoStatusKey
}

type PhotoStatus = {
  isEmpty: boolean
  isLoaded: boolean
  isLoading: boolean
  isStable: boolean
}

const IS_EMPTY = 'is--empty'
const IS_LOADED = 'is--loaded'
const IS_LOADING = 'is--loading'
const IS_STABLE = 'is--stable'

const getClassName = ({
  isEmpty,
  isLoaded,
  isLoading,
  isStable,
}: PhotoStatus) =>
  Object.entries({
    [IS_EMPTY]: isEmpty,
    [IS_LOADED]: isLoaded,
    [IS_LOADING]: isLoading,
    [IS_STABLE]: isStable,
  })
    .reduce<string[]>(
      (memo, [key, value]) => (value ? [...memo, key] : memo),
      []
    )
    .join(' ')

const StyledPhotoImage = styled(PhotoImage).attrs<PhotoStatus>(attrs => ({
  ...attrs,
  className: getClassName({
    isEmpty: attrs.isEmpty,
    isLoaded: attrs.isLoaded,
    isLoading: attrs.isLoading,
    isStable: attrs.isStable,
  }),
}))`
  will-change: width, height, opacity;
  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms ease-out 200ms;

  &.${IS_LOADING}, &.${IS_LOADED} {
    position: absolute;
  }

  &.${IS_LOADING}, &.${IS_LOADED}, &.${IS_STABLE} {
    visibility: visible;
  }

  &.${IS_LOADED}, &.${IS_STABLE} {
    opacity: 1;
  }

  [data-browser='ie11'] & {
    display: none;

    &.${IS_STABLE} {
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

  const [rect, setRect] = useState({ height, width })

  const props = {
    ...rect,
    aspectRatio,
    isLoaded,
    isStable,
    onTransitionEnd,
    src,
    srcSet,
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
        setRect({ height: img.height, width: img.width })
      }

      img.addEventListener('load', onLoad)

      if (isSrcSetSupported) {
        img.srcset = srcSet
      } else {
        img.src = src
      }
    }
  }, [onLoading, onLoaded, status, setRect])

  return isLoading || isLoaded || isStable ? (
    <StyledPhotoImage {...props} />
  ) : null
}

export default PhotoHiRes
