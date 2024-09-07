import { useEffect, useState } from 'react'

import { GetLayout, GetNavLayout, HeadMeta, Layout, PageWrapper } from '@/components'
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
    <PageWrapper>
      <HeadMeta title={'Inctagram'} />
      {t.publicPage.title}
    </PageWrapper>
  )
}

PublicPage.getLayout = GetLayout
export default PublicPage
