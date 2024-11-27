import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'

function Favorites() {
  return (
    <>
      <div>Favorites</div>
    </>
  )
}
Favorites.getLayout = function getLayout(page: ReactNode) {
  //the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default Favorites
