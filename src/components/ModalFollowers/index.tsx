import { FC, memo, useCallback, useMemo, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { SearchInputValueType } from '@/components/ModalFollowers/types'
import { useDebounceFollowers } from '@/components/ModalFollowers/useDebounceFollowers'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { ModalConfirm } from '@/components/modalConfirm'
import {
  useDeleteFolowerFromFolowersMutation,
  useFollowToUserMutation,
  useGetFollowersUsersQuery,
} from '@/services/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './modalFollowers.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  className?: string
  followersCount?: number | string
  myProfileId: null | number
  userName: string | undefined
}

export const ModalFollowers: FC<Props> = memo(({ followersCount, myProfileId, userName }) => {
  /**
   * вытягиваем id юзера из URL
   */
  const {
    query: { id },
  } = useRouter()
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * стэйт поиска подписчиков. seach - передаём в value инпута. textFromDebounceInput - текст поиска для отправки с
   * запросом на сервер (отображается с выдеркой времени, чтобы не отправлять на сервер каждый вводимый символ)
   */
  const [inputValue, setInputValue] = useState<SearchInputValueType>({
    search: '',
    textFromDebounceInput: '',
  })

  /**
   * хук RTKQ. запрос за подписчиками. params - это query-параметры, username используется, как uri.
   * skip - пока модальное окно подписчиков не открыто, не делаем запрос
   */
  const { data, isFetching: isFetchingGetFollowers } = useGetFollowersUsersQuery(
    {
      params: { search: inputValue.textFromDebounceInput },
      username: userName,
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
  const [unfollow] = useDeleteFolowerFromFolowersMutation()

  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeInputValue = useDebounceFollowers(setInputValue)
  /**
   * коллбэк для подписки на юзера
   * @param selectedUserId - id юзера, на которого хотим подпсаться
   */
  const toFollowUser = (selectedUserId: number) => {
    followingToUser({ selectedUserId }).unwrap()
  }
  /**
   * коллбэк для отподписки на юзера
   * @param selectedUserId - id юзера, на которого хотим подпсаться
   * @param setFn - set-функция из модалки подтверждения отписки. Когда запрос отписки на сервер успешен,
   * то закрываем модалку подтверждения
   */
  const unfollowUser = (selectedUserId: number, setFn: any) => {
    unfollow(selectedUserId)
      .unwrap()
      .then(() => setFn(false))
  }
  /**
   * формируем массив подписчиков с данных с сервера
   */
  const followers = useMemo(() => {
    return data?.items?.map(f => {
      return (
        <li className={s.li} key={f.id}>
          <div className={s.avaAndUserNameBlock}>
            <Image
              alt={'small-avatar'}
              className={s.image}
              height={36}
              src={f.avatars[0]?.url ?? defaultAva}
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
                Do you really want to delete a Following `&quot;`
                <Typography as={'span'} className={s.userName} variant={'h3'}>
                  {f.userName}
                </Typography>
                `&quot;`?
              </Typography>
            </ModalConfirm>
          </div>
        </li>
      )
    })
  }, [data])

  return (
    <Modalka onOpenChange={setOpen} open={myProfileId === Number(id) ? open : false}>
      <ModalkaTrigger asChild>
        <div className={s.followers}>
          <Typography variant={'regularBold14'}>{followersCount}</Typography>
          <Typography variant={'regular14'}>Followers</Typography>
        </div>
      </ModalkaTrigger>
      <ModalkaContent className={s.content}>
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
