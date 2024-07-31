import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import s from '@/components/main/main.module.scss'

export const Main: NextPage<PropsWithChildren> = ({ children }) => (
  <main className={s.main}>{children}</main>
)
