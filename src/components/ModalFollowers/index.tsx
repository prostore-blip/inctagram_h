import { FC, memo, useCallback, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { SearchInputValueType } from '@/components/ModalFollowers/types'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import {
  useDeleteFolowerFromFolowersMutation,
  useFollowToUserMutation,
  useGetFollowersUsersQuery,
} from '@/services/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalFollowers.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  className?: string
  followersCount?: number | string
}

export const ModalFollowers: FC<Props> = memo(({ className, followersCount }) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<SearchInputValueType>({
    search: '',
    textFromDebounceInput: '',
  })

  /**
   * хук RTKQ. проверка залогинен или нет
   */
  const { data: authMeData } = useAuthMeQuery()

  const { data, isFetching: isFetchingGetFollowers } = useGetFollowersUsersQuery(
    {
      params: { search: inputValue.textFromDebounceInput },
      username: authMeData?.userName,
    },
    { skip: !open }
  )
  /**
   * хук RTKQ. Подписка на юзера
   */
  const [followingToUser] = useFollowToUserMutation()
  /**
   * хук RTKQ. Убрать юзера из подписчиков
   */
  const [deleteUserFromFollowers] = useDeleteFolowerFromFolowersMutation()
  /**
   * номер таймера из функции задержки посыла текста из инпута на сервер
   */

  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeInputValue = useCallback(
    (inputData: string) => {
      setInputValue(prev => ({ ...prev, search: inputData }))
      clearTimeout(timerId)
      const idTimer = setTimeout(() => {
        setInputValue(prev => ({ ...prev, textFromDebounceInput: inputData }))
      }, 1500)

      setTimerId(+idTimer)
    },
    [timerId]
  )

  const toFollowUser = (selectedUserId: number, action: 'follow' | 'unfollow') => {
    if (action === 'follow') {
      followingToUser({ selectedUserId })
    } else {
      deleteUserFromFollowers(selectedUserId)
    }
  }
  const followers = data?.items?.map(f => {
    return (
      <li key={f.id}>
        <Image
          alt={'small-avatar'}
          className={s.image}
          height={36}
          src={f.avatars[0]?.url ?? defaultAva}
          width={36}
        />
        <div className={s.followButtonsBlock}>
          {!f.isFollowing && (
            <Button
              className={s.followButton}
              onClick={() => {
                toFollowUser(f.userId, 'follow')
              }}
              variant={'primary'}
            >
              Follow
            </Button>
          )}
          <Button
            className={s.unfollowButton}
            onClick={() => {
              toFollowUser(f.userId, 'unfollow')
            }}
            variant={'outline'}
          >
            Delete
          </Button>
        </div>
      </li>
    )
  })

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <div className={s.followers}>
          <Typography variant={'regularBold14'}>{followersCount}</Typography>
          <Typography variant={'regular14'}>Followers</Typography>
        </div>
      </ModalkaTrigger>
      <ModalkaContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalkaTitle className={s.title}>
          <Typography variant={'h1'}>{followersCount} Followers</Typography>
          <ModalkaButtonCancel asChild>
            <Button className={s.close} variant={'text'}>
              <Close />
            </Button>
          </ModalkaButtonCancel>
        </ModalkaTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <TextField
            onValueChange={onChangeInputValue}
            placeholder={'Search'}
            type={'search'}
            value={inputValue.search}
          />
          <ul className={s.followersWrapper}>{!isFetchingGetFollowers && followers}</ul>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
})
