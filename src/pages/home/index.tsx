import { HeadMeta } from '@/components/HeadMeta/headMeta'
import { getNavLayout } from '@/components/Layout/NavLayout/navLayout'
import { PageWrapper } from '@/components/PageWrapper/pageWrapper'

export function Home() {
  return (
    <PageWrapper>
      <HeadMeta title={'Inctagram'} />
      Home
    </PageWrapper>
  )
}
Home.getLayout = getNavLayout
export default Home
