import { ReactNode } from 'react'

import { SingUpComponent } from '@/components'
import { AuthLayout } from '@/components/layouts/AuthLayout'

export function SignUpPage() {
  return <SingUpComponent />
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUpPage
