import React, { useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { PHOTO_STATUS, usePhotoStatus } from '../hooks/usePhotoStatus'
import PhotoHiRes from './photo-hi-res'
import PhotoPreview from './photo-preview'

type Props = {
  meta: PhotoMeta
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 80px;

  &:first-child {
    margin-top: 0;
  }
`

const Photo: React.FC<Props> = ({ meta }) => {
  const [status, setStatus] = usePhotoStatus()
  const [ref, inView] = useInView({ triggerOnce: true })
  const onLoading = useCallback(() => setStatus(PHOTO_STATUS.LOADING), [
    setStatus,
  ])
  const onLoaded = useCallback(
    () => requestAnimationFrame(() => setStatus(PHOTO_STATUS.LOADED)),
    [setStatus]
  )
  const onStable = useCallback(
    () =>
      requestAnimationFrame(() => {
        setStatus(PHOTO_STATUS.STABLE)
      }),
    [setStatus]
  )

  return (
    <Wrapper ref={ref}>
      {status !== PHOTO_STATUS.STABLE ? (
        <PhotoPreview aria-hidden meta={meta} />
      ) : undefined}
      {inView ? (
        <PhotoHiRes
          meta={meta}
          onLoading={onLoading}
          onLoaded={onLoaded}
          onStable={onStable}
          status={status}
        />
      ) : undefined}
    </Wrapper>
  )
}

export default Photo
