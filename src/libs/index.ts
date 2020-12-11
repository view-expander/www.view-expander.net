import ImgixClient from 'imgix-core-js'

const IMGIX_DOMAIN = process.env.GATSBY_IMGIX_DOMAIN
const IMGIX_COMMON_PARAMS = {
  auto: 'format',
  fit: 'clip',
}
const WIDTHS = [543, 688, 928, 1288]

export const createPhotoPath = (key: string) =>
  `${process.env.GATSBY_IMGIX_PATH}/${key}`

const getObjectTypeName = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

export const imgixClient = IMGIX_DOMAIN
  ? new ImgixClient({ domain: IMGIX_DOMAIN })
  : undefined

export const isString = (value: unknown): value is string =>
  getObjectTypeName(value) === '[object String]'

export const isStringOfNotEmpty = (value: unknown): value is string =>
  isString(value) && value.length > 0

export const getImageSources = (
  key: string,
  aspectRatio: number,
  params: {} = {}
) => {
  if (!imgixClient) {
    return { src: undefined, srcSet: undefined }
  }

  const path = createPhotoPath(key)
  const src = imgixClient.buildURL(path, {
    ...IMGIX_COMMON_PARAMS,
    w: WIDTHS[WIDTHS.length - 1],
    h: WIDTHS[WIDTHS.length - 1],
    ...params,
  })
  const srcSet = imgixClient.buildSrcSet(
    path,
    {
      ...IMGIX_COMMON_PARAMS,
      ...params,
    },
    {
      widths:
        aspectRatio > 1 ? WIDTHS.map(w => Math.ceil(w / aspectRatio)) : WIDTHS,
    }
  )

  return { src, srcSet }
}

export const getPhotoAttributes = (meta: PhotoMeta, params?: {}) => {
  const { height, key, width } = meta
  const aspectRatio = height / width
  const { src, srcSet } = getImageSources(key, aspectRatio, params)

  return { aspectRatio, height, src, srcSet, width }
}
