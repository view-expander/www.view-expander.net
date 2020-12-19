declare type ArrayElement<T> = T extends Array<infer U> ? U : unknown

declare type PhotoAttrs = {
  aspectRatio: number
  height: number
  src: string | undefined
  srcSet: string | undefined
  width: number
}

declare type PhotoMeta = {
  height: number
  key: string
  width: number
}
