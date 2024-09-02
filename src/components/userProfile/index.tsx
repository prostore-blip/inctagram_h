import { PaidAccount } from '@/assets/icons/paidAccount'
import { ModalFollowers } from '@/components/ModalFollowers'
import { ModalFollowing } from '@/components/modalFollowing'
import { GetPostsUser } from '@/components/userProfile/getPostsUser'
import {
  useDeleteFolowerFromFolowersMutation,
  useFollowToUserMutation,
} from '@/services/inctagram.followings.service'
import { useGetUserProfileByUserNameQuery } from '@/services/inctagram.profile.service'
import { useGetMySubscriptionsQuery } from '@/services/inctagram.subscriptions.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './userProfile.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  dataProfile: any
  myProfileId: null | number
}

export function UserProfile({ dataProfile, myProfileId }: Props) {
  const router = useRouter()
  /**
   * запрос на сервер за профилем юзера по имени, чтобы забрать число followers
   */
  const { data } = useGetUserProfileByUserNameQuery(dataProfile?.userName, {})

  /**
   * запрос за проверкой подписки (для отображения вкладки статистики)
   */
  const { data: subscriptionData, isFetching: isFetchingGetMySubscriptions } =
    useGetMySubscriptionsQuery(undefined, { skip: !myProfileId })

  /**
   * открыть настройки
   */
  const openSettings = () => {
    void router.push('/generalInfo')
  }
  /**
   * открыть публикации
   */
  const openPublications = () => {
    if (!myProfileId) {
      return null
    }
    alert('openPublications')
    //открыть модалку публикаций
  }

  /**
   * хук RTKQ. Подписка на юзера
   */
  const [followingToUser] = useFollowToUserMutation()
  /**
   * хук RTKQ. Убрать юзера из подписчиков
   */
  const [unfollow] = useDeleteFolowerFromFolowersMutation()

  /**
   * коллбэк для подписки на юзера
   * @param selectedUserId - id юзера, на которого хотим подпсаться
   */
  const toFollowUser = (selectedUserId: number | undefined) => {
    if (selectedUserId) {
      followingToUser({ selectedUserId }).unwrap()
    }
  }

  /**
   * коллбэк для отподписки на юзера
   * @param selectedUserId - id юзера, на которого хотим подпсаться
   */
  const unfollowUser = (selectedUserId: number) => {
    unfollow(selectedUserId).unwrap()
  }

  return (
    <>
      <div className={s.avaAndDescrBlock}>
        <Image
          alt={'avatar'}
          className={s.image}
          height={data?.avatars[0]?.height ?? 204}
          src={data?.avatars[0]?.url ?? defaultAva}
          width={data?.avatars[0]?.width ?? 204}
        />
        <section className={s.aboutUserBlock}>
          <div className={s.userNameSettingsButtonBlock}>
            <Typography className={s.userName} variant={'h1'}>
              {data?.userName ?? 'UserName'}
              {subscriptionData?.length && !isFetchingGetMySubscriptions ? <PaidAccount /> : null}
            </Typography>
            {myProfileId === dataProfile.id && (
              <Button onClick={openSettings} variant={'secondary'}>
                <Typography variant={'h3'}>Profile Settings</Typography>
              </Button>
            )}
            {myProfileId && myProfileId !== dataProfile.id && (
              <div className={s.followUnfollowSendMessageButtonsBlock}>
                {!data?.isFollowing && (
                  <Button onClick={() => toFollowUser(data?.id)} variant={'primary'}>
                    <Typography variant={'h3'}>Follow</Typography>
                  </Button>
                )}
                {data?.isFollowing && (
                  <Button onClick={() => unfollowUser(data?.id)} variant={'outline'}>
                    <Typography variant={'h3'}>Unfollow</Typography>
                  </Button>
                )}
                <Button onClick={() => {}} variant={'secondary'}>
                  <Typography variant={'h3'}>Send Message</Typography>
                </Button>
              </div>
            )}
          </div>
          <div className={s.countsFolowwers}>
            <ModalFollowing
              followingCount={data?.followingCount ?? 'X'}
              userName={dataProfile.userName}
            />
            <ModalFollowers
              followersCount={data?.followersCount ?? 'X'}
              userName={dataProfile.userName}
            />
            <div className={s.publications} onClick={openPublications}>
              <Typography variant={'regularBold14'}>{data?.publicationsCount ?? 'X'}</Typography>
              <Typography variant={'regular14'}>Publications</Typography>
            </div>
          </div>
          <article className={s.aboutMe}>
            <Typography variant={'regular16'}>
              {data?.aboutMe ??
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
              ea commodo consequat.`}
            </Typography>
          </article>
        </section>
      </div>
      <GetPostsUser />
    </>
  )
}
