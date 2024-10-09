import { memo, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { Followers } from '@/components/modal-followers/Followers'
import { SearchInputValueType } from '@/components/modal-followers/types'
import { useGetFollowersUsersQuery } from '@/services/incta-team-api/followings/followings-service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import { useRouter } from 'next/router'

import s from './modalFollowers.module.scss'

import { useDebounceFollowers } from './useDebounceFollowers'

type Props = {
  className?: string
  followersCount?: number | string
  myProfileId: string | undefined
  userName: string | undefined
}

export const ModalFollowers = memo(({ followersCount, myProfileId, userName }: Props) => {
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
   * кастомный хук. задержка посыла запроса на каждый символ в поле поиска followers
   */
  const onChangeInputValue = useDebounceFollowers(setInputValue)

  return (
    <Modal onOpenChange={setOpen} open={myProfileId === id ? open : false}>
      <ModalTrigger asChild>
        <div className={s.followers}>
          <Typography variant={'regularBold14'}>{followersCount}</Typography>
          <Typography variant={'regular14'}>Followers</Typography>
        </div>
      </ModalTrigger>
      <ModalContent
        aria-describedby={undefined}
        className={s.content}
        onInteractOutside={e => e.preventDefault()}
      >
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
          <ul className={s.followersWrapper}>
            {!isFetchingGetFollowers && <Followers items={data?.items} />}
          </ul>
        </Card>
      </ModalContent>
    </Modal>
  )
})
