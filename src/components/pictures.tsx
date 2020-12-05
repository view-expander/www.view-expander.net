import React from 'react'

type Props = {
  value: PhotoMeta[]
}

const Pictures: React.FC<Props> = ({ value }) => (
  <>
    {value.map(({ height, key, width }) =>
      height !== null && key !== null && width !== null ? (
        <div key={key}>
          {key}: {width}x{height}
        </div>
      ) : undefined
    )}
  </>
)

export default Pictures
