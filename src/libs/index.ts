import ImgixClient from 'imgix-core-js'

const domain = process.env.GATSBY_IMGIX_DOMAIN

export const createPhotoPath = (key: string) =>
  `${process.env.GATSBY_IMGIX_PATH}/${key}`

export const imgixClient = domain ? new ImgixClient({ domain }) : undefined
