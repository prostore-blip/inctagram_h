import { GetNavLayout, HeadMeta, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Home() {
  return (
    <LoginNavigate>
      <PageWrapper>
        <HeadMeta title={'Inctagram'} />
        Home
      </PageWrapper>
    </LoginNavigate>
  )
}

Home.getLayout = GetNavLayout
export default Home
