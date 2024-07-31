import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'

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
