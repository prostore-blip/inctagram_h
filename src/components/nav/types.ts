import { ReactNode } from 'react'

export type MainNavigationItem = {
  action?: () => void
  icon: ReactNode
  name: string
  path?: string
}
