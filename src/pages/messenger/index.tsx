import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'

function Messenger() {
  return <>Messenger</>
}

Messenger.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}
export default Messenger
