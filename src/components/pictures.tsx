import React from 'react'
import { useInView } from 'react-intersection-observer'
import Photo from './photo'

type Props = {
  value: PhotoMeta[]
}

const Pictures: React.FC<Props> = ({ value }) => {
  const [ref, inView] = useInView()

  return (
    <div ref={ref}>
      {value.map(({ height, key, width }) =>
        height !== null && key !== null && width !== null ? (
          <Photo key={key} inView={inView} meta={{ height, key, width }} />
        ) : undefined
      )}
    </div>
  )
}

export default Pictures
