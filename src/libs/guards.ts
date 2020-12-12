const getObjectTypeName = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

export const isNumber = (value: unknown): value is number =>
  getObjectTypeName(value) === '[object Number]'

export const isString = (value: unknown): value is string =>
  getObjectTypeName(value) === '[object String]'

export const isStringOfNotEmpty = (value: unknown): value is string =>
  isString(value) && value.length > 0
