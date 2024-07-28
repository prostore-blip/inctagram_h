import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { en } from '@/locales/en'
import { ru } from '@/locales/ru'
import { useRouter } from 'next/router'

export function PublicPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <HeadMeta title={'Inctagram'} />
      {t.publicPage.title}
    </PageWrapper>
  )
}

PublicPage.getLayout = GetLayout
export default PublicPage
