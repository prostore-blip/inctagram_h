import React from 'react'

import { ArrowBack } from '@/assets/icons'
import { Typography } from '@chrizzo/ui-kit'
import Link from 'next/link'

import s from './policyDocuments.module.scss'

import { text } from './text'

type Props = {
  headline: string
}

export const PolicyDocuments = ({ headline }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.topBar}>
        <Typography as={Link} className={s.backSign} href={'/signUp'}>
          <ArrowBack />
          <Typography className={s.text} variant={'regular14'}>
            Back to Sign Up
          </Typography>
        </Typography>
      </div>
      <div className={s.container}>
        <Typography className={s.h1} variant={'h1'}>
          {headline}
        </Typography>
        <Typography as={'p'} className={s.box} textAlign={'center'}>
          {text}
        </Typography>
      </div>
    </div>
  )
}
