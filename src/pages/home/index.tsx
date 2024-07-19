import { GetNavLayout, HeadMeta, PageWrapper } from '@/components'

export function Home() {
  return (
    <PageWrapper>
      <HeadMeta title={'Inctagram'} />
      Home
    </PageWrapper>
  )
}
Home.getLayout = GetNavLayout
export default Home
