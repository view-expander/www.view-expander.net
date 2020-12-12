import { isStringOfNotEmpty } from './guards'

export { isString, isStringOfNotEmpty } from './guards'
export { getPhotoAttributes } from './imgix'

type PathSegment = string | null | undefined

export const getPath = (
  root: PathSegment = '/',
  ...pathSegments: PathSegment[]
) =>
  `${isStringOfNotEmpty(root) ? root : ''}${pathSegments
    .filter(isStringOfNotEmpty)
    .join('/')}/`
