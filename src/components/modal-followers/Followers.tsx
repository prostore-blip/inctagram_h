import { ModalConfirm } from '@/components/modalConfirm'
import {
  FollowerItem,
  useFollowToUserMutation,
} from '@/services/incta-team-api/followings/followings-service'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from '@/components/modal-followers/modalFollowers.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  items: FollowerItem[] | undefined
}
export const Followers = ({ items = [] }: Props) => {
  /**
   * хук RTKQ. Убрать юзера из подписчиков
   */
  // const [unfollow] = useDeleteFolowerFromFolowersMutation()
  /**
   * хук RTKQ. Подписка на юзера
   */
  const [followingToUser] = useFollowToUserMutation()
  /**
   * коллбэк для подписки на юзера
   * @param selectedUserId - id юзера, на которого хотим подписаться
   */
  const toFollowUser = (selectedUserId: string) => {
    followingToUser({ selectedUserId }).unwrap()
    alert('подписался')
  }
  /**
   * коллбэк для отподписки на юзера
   * @param selectedUserId - id юзера, от которого хотим отписаться
   * @param setFn - set-функция из модалки подтверждения отписки. Когда запрос отписки на сервер успешен,
   * то закрываем модалку подтверждения
   */
  const unfollowUser = (selectedUserId: string, setFn: any) => {
    // unfollow(selectedUserId)
    //   .unwrap()
    //   .then(() => setFn(false))
    alert('отписался')
  }

  return items.map((f: any) => {
    return (
      <li className={s.li} key={f.id}>
        <div className={s.avaAndUserNameBlock}>
          <Image
            alt={'small-avatar'}
            className={s.image}
            height={36}
            // src={f.avatars[0]?.url ?? defaultAva}
            src={defaultAva}
            width={36}
          />
          <Typography variant={'regular16'}> {f.userName}</Typography>
        </div>
        <div className={s.followButtonsBlock}>
          {!f.isFollowing && (
            <Button
              className={s.followButton}
              onClick={() => {
                toFollowUser(f.userId)
              }}
              variant={'primary'}
            >
              Follow
            </Button>
          )}
          <ModalConfirm
            callback={unfollowUser}
            title={'Delete Following'}
            titleButtonTrigger={'Delete'}
            user={f}
            variantTriggerButton={'secondary'}
          >
            <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
              Do you really want to delete a Following &quot;
              <Typography as={'span'} className={s.userName} variant={'h3'}>
                {f.userName}
              </Typography>
              &quot;?
            </Typography>
          </ModalConfirm>
        </div>
      </li>
    )
  })
}
