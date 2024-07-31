import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import s from '@/components/main/main.module.scss'
import { SingUp } from '../auth/registration/singUp/singUp'

export const Main: NextPage<PropsWithChildren> = ({ children }) => (
  <main className={s.main}><SingUp onSubmit={()=>{}}/></main>
)
