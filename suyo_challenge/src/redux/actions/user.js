import { HANDLE_USER } from '../types/types'

export const setUser = (user) => ({
  type: HANDLE_USER,
  payload: { user },
})
