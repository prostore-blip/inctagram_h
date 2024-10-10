import { ReactNode } from 'react'

import { HeadMeta } from '@/components'
import { BaseLayout } from '@/components/layouts/BaseLayout'

function Home() {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      Home
    </>
  )
}

Home.getLayout = function getLayout(page: ReactNode) {
  //the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default Home
