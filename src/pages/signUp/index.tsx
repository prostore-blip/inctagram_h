import { useState } from 'react'

import { PageWrapper, SingUp } from '@/components'
import { useSingUpMutation } from '@/services'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

export function SignUp() {
  const [singUp, { data, isLoading }] = useSingUpMutation()

  const router = useRouter()

  const register = async (formData: any) => {
    try {
      const response = await singUp(formData)

      router.push('/profile')
      console.log('Response from server:', response)
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <PageWrapper>
      <SingUp onSubmit={register} />
    </PageWrapper>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
