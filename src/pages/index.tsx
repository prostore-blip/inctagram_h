import { useEffect, useState } from 'react'

import { GetLayout, GetNavLayout, HeadMeta, Layout, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

export function PublicPage() {
  const { t } = useTranslation()

  console.log('PubliPage')
  //--------------  временный редирект на страницу пользователя--------------

  const router = useRouter()

  useEffect(() => {
    console.log('useEffect from PubliPage')

    void router.push('/profile')
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
