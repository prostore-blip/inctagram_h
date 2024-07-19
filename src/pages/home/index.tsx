import { getNavLayout } from '@/components/Layout/NavLayout/navLayout'
import { PageWrapper } from '@/components/PageWrapper/pageWrapper'

export function Home() {
  return <PageWrapper>Home</PageWrapper>
}
Home.getLayout = getNavLayout
export default Home
