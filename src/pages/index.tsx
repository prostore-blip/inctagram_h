import { GetLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

// export default function Home1() {
//   return (
//     <>
//       <LoginNavigate>
//         <PageWrapper>Home Page</PageWrapper>
//       </LoginNavigate>
//     </>
//   )
// }
// Home1.getLayout = GetLayout
export function PublicPage() {
  return <PageWrapper>PublicPage</PageWrapper>
}

PublicPage.getLayout = GetLayout
export default PublicPage
