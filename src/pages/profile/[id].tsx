import { PageWrapper } from '@/components'
import { UserProfile } from '@/components/userProfile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import s from './userProfilePage.module.scss'

/**
 * SSR
 */
export const getServerSideProps = (async ({ params }) => {
  /**
   * запрос me
   */
  const res = await fetch('https://inctagram.work/api/v1/auth/me')
  const me: any = await res.json()

  /**
   * если я залогинен, то делаю запрос за своим профилем, иначе за публичным
   */
  if (me.userId) {
    const resProfile = await fetch(`https://inctagram.work/api/v1/users/profile`)
    const profile: any = await resProfile.json()

    return { props: { myProfileId: me.userId, profile } }
  } else {
    const resProfile = await fetch(
      `https://inctagram.work/api/v1/public-user/profile/${params?.id}`
    )
    const profile: any = await resProfile.json()

    return { props: { myProfileId: null, profile } }
  }
}) satisfies GetServerSideProps<{ myProfileId: null | undefined; profile: any }>

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
