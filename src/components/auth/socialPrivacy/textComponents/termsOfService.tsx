import React from 'react'

import { PrivacyText } from '@/components/auth/socialPrivacy/textComponents/privacyText'

type TermsOfServiceProps = {
  title: string
}

export function TermsOfService(props: TermsOfServiceProps) {
  const { title } = props

  return (
    <div>
      <h1>{title}</h1>
      <PrivacyText />
    </div>
  )
}
