import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { MailVerificationError } from '@/components/auth/mailVerificationError'
import { PolicyDocuments } from '@/components/auth/policyDocuments'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

export function PublicPage() {
  const { t } = useTranslation()

  //--------------  временный редирект на страницу пользователя--------------

  const router = useRouter()

  void router.push('/profile')

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
