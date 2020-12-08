import ImgixClient from 'imgix-core-js'

const domain = process.env.GATSBY_IMGIX_DOMAIN

export const imgixClient = domain ? new ImgixClient({ domain }) : undefined
