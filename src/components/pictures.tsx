import React from 'react'
import Photo from './photo'

type Props = {
  value: PhotoMeta[]
}

const Pictures: React.FC<Props> = ({ value }) => (
  <>
    {value.map(({ height, key, width }) =>
      height !== null && key !== null && width !== null ? (
        <Photo key={key} meta={{ height, key, width }} />
      ) : undefined
    )}
  </>
)

export default Pictures
