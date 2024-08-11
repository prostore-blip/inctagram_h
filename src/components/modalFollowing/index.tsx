import { FC, memo, useCallback, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { ModalConfirm } from '@/components/modalConfirm'
import { SearchInputValueType } from '@/components/modalFollowers/types'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import {
  useDeleteFolowerFromFolowersMutation,
  useGetFollowingUsersQuery,
} from '@/services/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalFollowin.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  className?: string
  followingCount?: number | string
}

export const ModalFollowing: FC<Props> = memo(({ className, followingCount }) => {
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

  const { data, isFetching: isFetchingGetFollowing } = useGetFollowingUsersQuery(
    {
      params: { search: inputValue.textFromDebounceInput },
      username: authMeData?.userName,
    },
    { skip: !open }
  )
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

  const following = data?.items?.map(f => {
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
          <ModalConfirm user={f} />
        </div>
      </li>
    )
  })

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <div className={s.following}>
          <Typography variant={'regularBold14'}>{followingCount}</Typography>
          <Typography variant={'regular14'}>Following</Typography>
        </div>
      </ModalkaTrigger>
      <ModalkaContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalkaTitle className={s.title}>
          <Typography variant={'h1'}>{followingCount} Following</Typography>
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
          <ul className={s.followingWrapper}>{!isFetchingGetFollowing && following}</ul>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
})
