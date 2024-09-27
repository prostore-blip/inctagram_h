import { ReactNode, useEffect } from 'react'

import { HeadMeta } from '@/components'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

export function PublicPage() {
  const { t } = useTranslation()

  //--------------  временный редирект на страницу пользователя--------------

  const router = useRouter()

  useEffect(() => {
    void router.push('/profile')
    //todo redirecting with useEffect in nextjs not a good option
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //-------------------------------------------------------------------------
  return (
    <div>
      <HeadMeta title={'Inctagram'} />
      {t.publicPage.title}
    </div>
  )
}

PublicPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default PublicPage
