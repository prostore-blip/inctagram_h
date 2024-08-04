import React, { ReactNode } from 'react'

import s from '@/components/auth/socialPrivacy/socialPrivacy.module.scss'

type PrivacyTextProps = {
  text?: ReactNode
}

export const PrivacyText = (props: PrivacyTextProps) => {
  const { text } = props

  return <div className={s.box}>{text}</div>
}
