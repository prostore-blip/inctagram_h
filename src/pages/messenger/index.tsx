import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Messenger() {
  return (
    <LoginNavigate>
      <>Messenger</>
    </LoginNavigate>
  )
}

Messenger.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}
export default Messenger
