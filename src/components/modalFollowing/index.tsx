import { FC, memo, useCallback, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { FollowersUsersType, SearchInputValueType } from '@/components/modal-followers/types'
import { ModalConfirm } from '@/components/modalConfirm'
import { useAuthMeQuery } from '@/services'
import {
  useDeleteFolowerFromFolowersMutation,
  useGetFollowingUsersQuery,
} from '@/services/inctagram-work-api/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalFollowin.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  className?: string
  followingCount?: number | string
}

export const ModalFollowing = memo(({ className, followingCount }: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * стэйт поиска юзеров, на которых подписан. seach - передаём в value инпута. textFromDebounceInput - текст поиска
   * для отправки с запросом на сервер (отображается с выдеркой времени, чтобы не отправлять на сервер каждый
   * вводимый символ)
   */
  const [inputValue, setInputValue] = useState<SearchInputValueType>({
    search: '',
    textFromDebounceInput: '',
  })

  /**
   * хук RTKQ. проверка залогинен или нет
   */
  const { data: authMeData } = useAuthMeQuery()
  /**
   * хук RTKQ. запрос за юзерами, на которых подписан. params - это query-параметры, username используется, как uri.
   * skip - пока модальное окно юзеров, на которых подписан, не открыто, не делаем запрос
   */
  const { data, isFetching: isFetchingGetFollowing } = useGetFollowingUsersQuery(
    {
      params: { search: inputValue.textFromDebounceInput },
      username: authMeData?.userName,
    },
    { skip: !open }
  )

  /**
   * хук RTKQ. Отписаться от юзера
   */
  const [unfollow] = useDeleteFolowerFromFolowersMutation()
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
   * формируем массив юзеров, на которых подписан с данных с сервера
   */

  return (
    <Modal onOpenChange={setOpen} open={open}>
      <ModalTrigger asChild>
        <div className={s.following}>
          <Typography variant={'regularBold14'}>{followingCount}</Typography>
          <Typography variant={'regular14'}>Following</Typography>
        </div>
      </ModalTrigger>
      <ModalContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalTitle className={s.title}>
          <Typography variant={'h1'}>{followingCount} Following</Typography>
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
          <ul className={s.followingWrapper}>
            {data?.items?.length && <Following data={data} unfollowUser={unfollowUser} />}
          </ul>
        </Card>
      </ModalContent>
    </Modal>
  )
})

//todo create components instead of this
function Following({
  data,
  unfollowUser,
}: {
  data: { items: FollowersUsersType[] }
  unfollowUser: Function
}) {
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
        <div className={s.modalConfirm}>
          <ModalConfirm
            callback={unfollowUser as any}
            title={'Unfollow'}
            titleButtonTrigger={'Unfollow'}
            user={f}
            variantTriggerButton={'outline'}
          >
            <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
              Do you really want to Unfollow from this user &quot;
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
