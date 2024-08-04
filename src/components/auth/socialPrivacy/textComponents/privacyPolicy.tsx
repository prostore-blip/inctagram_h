import React from 'react'

import { PrivacyText } from '@/components/auth/socialPrivacy/textComponents/privacyText'

type PrivacyPolicyProps = {
  title: string
}

export function PrivacyPolicy(props: PrivacyPolicyProps) {
  const { title } = props

  return (
    <div>
      <h1>{title}</h1>
      <PrivacyText />
    </div>
  )
}
