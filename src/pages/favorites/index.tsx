import { GetNavLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Favorites() {
  return (
    <LoginNavigate>
      <PageWrapper>Favorites</PageWrapper>
    </LoginNavigate>
  )
}
Favorites.getLayout = GetNavLayout
export default Favorites
