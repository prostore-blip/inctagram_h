import { FC, memo, useCallback, useMemo, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { SearchInputValueType } from '@/components/modal-followers/types'
import { ModalConfirm } from '@/components/modalConfirm'
import {
  useFollowToUserMutation,
  useGetFollowersUsersQuery,
} from '@/services/incta-team-api/followings/followings-service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './modalFollowers.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  className?: string
  followersCount?: number | string
  myProfileId: string | undefined
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
  // const [unfollow] = useDeleteFolowerFromFolowersMutation()
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
  /**
   * формируем массив подписчиков с данных с сервера
   */
  const followers = useMemo(() => {
    return data?.items?.map((f: any) => {
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
    <Modal onOpenChange={setOpen} open={myProfileId === id ? open : false}>
      <ModalTrigger asChild>
        <div className={s.followers}>
          <Typography variant={'regularBold14'}>{followersCount}</Typography>
          <Typography variant={'regular14'}>Followers</Typography>
        </div>
      </ModalTrigger>
      <ModalContent aria-describedby={undefined} className={s.content}>
        <ModalTitle className={s.title}>
          <Typography variant={'h1'}>{followersCount} Followers</Typography>
          <ModalButtonCancel asChild>
            <Button className={s.close} variant={'text'}>
              <Close />
            </Button>
          </ModalButtonCancel>
        </ModalTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <TextField
            onValueChange={onChangeInputValue}
            placeholder={'Search'}
            type={'search'}
            value={inputValue.search}
          />
          <ul className={s.followersWrapper}>{!isFetchingGetFollowers && followers}</ul>
        </Card>
      </ModalContent>
    </Modal>
  )
})
