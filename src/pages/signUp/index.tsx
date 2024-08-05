import { GetLayout, PageWrapper, SingUp } from '@/components'
import { useLoginMutation } from '@/services'
import { useRouter } from 'next/router'

export function SignUp() {
  const [singUp, { data, isLoading }] = useLoginMutation()

  const router = useRouter()

  if (isLoading) {
    return <div>Loading</div>
  }
  const register = (data: any) => {
    console.log(data)
    singUp(data)
  }

  if(data?.id) {
    
  router.push('/profile')
  }

  return (
    <PageWrapper>
      <SingUp onSubmit={register} />
    </PageWrapper>
  )
}

SignUp.getLayout = GetLayout
export default SignUp
