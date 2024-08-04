import React from 'react'

import ArrowBackOutline from '@/assets/icons/arrow-back-outline'
import { PageWrapper } from '@/components'
import { PrivacyPolicy } from '@/components/auth/socialPrivacy/textComponents/privacyPolicy'
import { TermsOfService } from '@/components/auth/socialPrivacy/textComponents/termsOfService'
import { Typography } from '@chrizzo/ui-kit'
import Link from 'next/link'

import s from '@/components/auth/socialPrivacy/socialPrivacy.module.scss'

export const SocialPrivacy = () => {
  const termsOfServiceTitle = 'Terms of Service'
  const privacyPolicyTitle = 'Privacy Policy'

  return (
    <div className={s.root}>
      <PageWrapper>
        <div className={s.backSign}>
          <ArrowBackOutline className={s.arrow} />
          <Typography as={Link} className={s.text} href={'/'} variant={'regular14'}>
            Back to Sign Up
          </Typography>
        </div>
        <div className={s.container}>
          <TermsOfService title={termsOfServiceTitle} />
          <PrivacyPolicy title={privacyPolicyTitle} />
        </div>
      </PageWrapper>
    </div>
  )
}
