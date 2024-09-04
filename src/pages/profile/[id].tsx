import { PageWrapper } from '@/components'
import { UserProfile } from '@/components/userProfile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import s from './userProfilePage.module.scss'

/**
 * SSR
 */
export const getServerSideProps = (async ({ params, req }) => {
  /**
   * вытягиваю из куки access-токен. Это та кука, которую я создал при логине
   */
  const token = req.cookies.access_token

  /**
   * если access-токен есть, то из него парсим вторую часть. Там сидит id моего аккаунта
   */
  const tokenPayload = token ? JSON.parse(atob(token?.split('.')[1])) : undefined

  if (token && tokenPayload.userId === Number(params?.id)) {
    const resProfile = await fetch(`https://inctagram.work/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const profile: any = await resProfile.json()

    return { props: { myProfileId: tokenPayload.userId, profile } }
  } else {
    const resProfile = await fetch(
      `https://inctagram.work/api/v1/public-user/profile/${params?.id}`
    )
    const profile: any = await resProfile.json()

    return { props: { myProfileId: token ? tokenPayload.userId : null, profile } }
  }
}) satisfies GetServerSideProps<{ myProfileId: null | number; profile: any }>

/**
 * Компонент
 */
function UserProfileDinamicPage(props: {
  pageProps: InferGetServerSidePropsType<typeof getServerSideProps>
}) {
  return (
    <PageWrapper>
      <div className={s.overflowedContainer}>
        <div className={s.mainCntainer}>
          <UserProfile
            dataProfile={props.pageProps.profile}
            myProfileId={props.pageProps.myProfileId}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

export default UserProfileDinamicPage
