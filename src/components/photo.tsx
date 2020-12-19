import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { PHOTO_STATUS, usePhotoStatus } from '../hooks/usePhotoStatus'
import { getPhotoAttributes } from '../libs'
import PhotoHiRes from './photo-hi-res'
import PhotoImage from './photo-image'

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
  const previewPhotoAttrs = getPhotoAttributes(meta, {
    colorquant: 2,
    sat: -100,
    gam: -90,
    blur: 20,
  })
  const hiResPhotoAttrs = getPhotoAttributes(meta)

  const [rect, setRect] = useState({
    height: hiResPhotoAttrs.height,
    width: hiResPhotoAttrs.width,
  })
  const [status, setStatus] = usePhotoStatus()
  const [ref, inView] = useInView({ threshold: 0.33, triggerOnce: true })
  const onLoading = useCallback(() => setStatus(PHOTO_STATUS.LOADING), [
    setStatus,
  ])
  const onLoaded = useCallback(
    ({ height, width }: Pick<PhotoMeta, 'height' | 'width'>) =>
      requestAnimationFrame(() => {
        const $html = document.querySelector('html')
        const toBeStable =
          $html && $html.getAttribute('data-browser') === 'ie11'

        setRect({ height, width })
        setStatus(toBeStable ? PHOTO_STATUS.STABLE : PHOTO_STATUS.LOADED)
      }),
    [setRect, setStatus]
  )
  const onStable = useCallback(
    () => requestAnimationFrame(() => setStatus(PHOTO_STATUS.STABLE)),
    [setStatus]
  )

  return (
    <>
      <Helmet>
        <link
          key={`${meta.key}.preview`}
          rel="preload"
          href={previewPhotoAttrs.src}
          as="image"
        />
        <link
          key={`${meta.key}.hi-res`}
          rel="preload"
          href={hiResPhotoAttrs.src}
          // @ts-ignore
          imageSrcset={hiResPhotoAttrs.srcSet}
          as="image"
        />
      </Helmet>
      <Wrapper ref={ref}>
        {status !== PHOTO_STATUS.STABLE ? (
          <PhotoImage aria-hidden {...previewPhotoAttrs} />
        ) : undefined}
        {inView ? (
          <PhotoHiRes
            {...hiResPhotoAttrs}
            height={rect.height}
            onLoading={onLoading}
            onLoaded={onLoaded}
            onStable={onStable}
            status={status}
            width={rect.width}
          />
        ) : undefined}
      </Wrapper>
    </>
  )
}

export default Photo
