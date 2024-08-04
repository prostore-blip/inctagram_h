import { GetNavLayout, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'

export function Search() {
  return (
    <LoginNavigate>
      <PageWrapper>Search</PageWrapper>
    </LoginNavigate>
  )
}

Search.getLayout = GetNavLayout
export default Search
