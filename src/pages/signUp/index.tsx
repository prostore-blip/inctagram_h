import { GetLayout, PageWrapper, SingUp } from '@/components'
import { useSingUpMutation } from '@/services'
import { useRouter } from 'next/router'

export function SignUp() {
  const [singUp, { data, isLoading }] = useSingUpMutation()

  const router = useRouter()

  if (isLoading) {
    return <div>Loading</div>
  }
  const register = (data: any) => {
    console.log(data)
    singUp(data)
  }

  // if(data?.success) {
    
  // router.push('/profile')
  // }

  return (
    <PageWrapper>
      <SingUp onSubmit={register} />
    </PageWrapper>
  )
}

// SignUp.getLayout = GetLayout
export default SignUp
