import { PropsWithChildren, ReactNode } from 'react'

import clsx from 'clsx'
import { NextPage } from 'next'

import s from '@/components/main/main.module.scss'
type Props = {
  isAuthMe: boolean
}
export const Main: NextPage<PropsWithChildren<Props>> = ({ children, isAuthMe }) => (
  <main className={clsx(s.main, !isAuthMe && s.marginAuto)}>{children}</main>
)
