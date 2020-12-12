export { getPhotoAttributes } from './imgix'

const getObjectTypeName = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

export const isString = (value: unknown): value is string =>
  getObjectTypeName(value) === '[object String]'

export const isStringOfNotEmpty = (value: unknown): value is string =>
  isString(value) && value.length > 0
