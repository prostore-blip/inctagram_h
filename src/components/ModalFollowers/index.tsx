import { FC, memo, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { Followers } from '@/components/ModalFollowers/Followers'
import { SearchInputValueType } from '@/components/ModalFollowers/types'
import { useDebounceFollowers } from '@/components/ModalFollowers/useDebounceFollowers'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { useGetFollowersUsersQuery } from '@/services/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import { useRouter } from 'next/router'

import s from './modalFollowers.module.scss'

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
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeInputValue = useDebounceFollowers(setInputValue)

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
          <ul className={s.followersWrapper}>
            {!isFetchingGetFollowers && <Followers items={data?.items} />}
          </ul>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
})
