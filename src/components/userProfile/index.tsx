import { ModalFollowers } from '@/components/modal-followers'
import { PostsUser } from '@/components/userProfile/posts-user'
import { useGetProfileQuery } from '@/services/incta-team-api/profile/profile-service'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './userProfile.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

export function UserProfile({}) {
  const router = useRouter()
  /**
   * запрос на сервер за профилем юзера по id
   */
  const { data, isFetching } = useGetProfileQuery({ id: 's' })

  /**
   * открыть настройки
   */
  const openSettings = () => {
    void router.push('/generalInfo')
  }

  return (
    <>
      <div className={s.avaAndDescrBlock}>
        <Image alt={'avatar'} className={s.image} height={204} src={defaultAva} width={204} />
        <section className={s.aboutUserBlock}>
          <div className={s.userNameSettingsButtonBlock}>
            <Typography className={s.userName} variant={'h1'}>
              {data?.userName ?? 'UserName'}
            </Typography>
            <Button onClick={openSettings} variant={'secondary'}>
              <Typography variant={'h3'}>Profile Settings</Typography>
            </Button>
          </div>
          <div className={s.countsFolowwers}>
            <div className={s.following}>
              <Typography variant={'regularBold14'}>1000</Typography>
              <Typography variant={'regular14'}>Following</Typography>
            </div>
            <ModalFollowers followersCount={700} myProfileId={data?.id} userName={data?.userName} />
            <div className={s.publications}>
              <Typography variant={'regularBold14'}>1000</Typography>
              <Typography variant={'regular14'}>Publications</Typography>
            </div>
          </div>
          <article className={s.aboutMe}>
            <Typography variant={'regular16'}>
              {data?.about ??
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
              ea commodo consequat.`}
            </Typography>
          </article>
        </section>
      </div>
      <PostsUser
        userId={isFetching ? 'data.id' : data.id}
        userName={isFetching ? 'data.userName' : data.userName}
      />
    </>
  )
}
