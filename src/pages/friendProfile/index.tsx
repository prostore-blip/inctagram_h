import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'

function FriendProfile() {
  return (
    <>
      <div>FriendProfile</div>
    </>
  )
}

FriendProfile.getLayout = function getLayout(page: ReactNode) {
  //the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default FriendProfile
