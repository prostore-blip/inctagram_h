import { useState } from 'react'

import { PageWrapper, SingUp } from '@/components'
import { useSingUpMutation } from '@/services'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

export function SignUp() {
  return (
    <PageWrapper>
      <SingUp />
    </PageWrapper>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
