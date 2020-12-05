declare type ArrayElement<T> = T extends Array<infer U> ? U : unknown

declare type PhotoMeta = {
  height: number
  key: string
  width: number
}
