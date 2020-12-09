import { useState } from 'react'

export const PHOTO_STATUS = {
  EMPTY: 'EMPTY',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  STABLE: 'STABLE',
} as const

export type PhotoStatusKey = typeof PHOTO_STATUS[keyof typeof PHOTO_STATUS]

export const usePhotoStatus = () => useState<PhotoStatusKey>(PHOTO_STATUS.EMPTY)
