import { GetLayout, HeadMeta, PageWrapper } from '@/components'

export function Home() {
  return (
    <PageWrapper>
      <HeadMeta title={'Inctagram'} />
      Home
    </PageWrapper>
  )
}

Home.getLayout = GetLayout
export default Home
