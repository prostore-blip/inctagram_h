import { memo, useCallback, useState } from 'react'

import { DropDownTriggerIcon } from '@/assets/icons/dropDownTriggerIcon'
import {
  DropDown,
  DropDownContent,
  DropDownGroup,
  DropDownItem,
  DropDownTrigger,
  Typography,
} from '@chrizzo/ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './dropDownHeader.module.scss'

import FavoritesIcon from '../../assets/icons/svg/mobileApp/bookmark.svg'
import LogOutIcon from '../../assets/icons/svg/mobileApp/log-out.svg'
import SettingIcon from '../../assets/icons/svg/mobileApp/settings.svg'
import StatisticsIcon from '../../assets/icons/svg/mobileApp/trending-up.svg'

export const DropDownHeader = memo(() => {
  const router = useRouter()

  /**
   * открыть/закрыть модальное окно DropDown
   */
  const [open, setOpen] = useState(false)

  /**
   * обработчик навигации + закрытие модального окна dropDown
   */
  const getToProfileSettingsHandler = useCallback(() => {
    router.push('/profile')
    setOpen(false)
  }, [])

  /**
   * обработчик навигации + закрытие модального окна dropDown
   */
  const getToStatisticsHandler = useCallback(() => {
    router.push('/statistics')
    setOpen(false)
  }, [])

  /**
   * обработчик навигации + закрытие модального окна dropDown
   */
  const getToFavoritesHandler = useCallback(() => {
    router.push('/favorites')
    setOpen(false)
  }, [])

  /**
   * обработчик вылогинивания + закрытие модального окна dropDown
   */
  const logOutHandler = useCallback(() => {
    //TODO здесь логика вылогинивания
    setOpen(false)
  }, [])

  return (
    <>
      <DropDown onOpenChange={setOpen} open={open}>
        <DropDownTrigger>
          <div className={clsx(s.trigger, open ? s.openColor : s.closeColor)}>
            <DropDownTriggerIcon />
          </div>
        </DropDownTrigger>
        <DropDownContent align={'end'} alignOffset={0} className={clsx(s.content)} sideOffset={0}>
          <div>
            <DropDownGroup className={s.group}>
              <DropDownItem className={s.item} onclick={getToProfileSettingsHandler}>
                <SettingIcon />
                <Typography variant={'regular14'}>Profile Setting</Typography>
              </DropDownItem>
              <DropDownItem className={s.item} onclick={getToStatisticsHandler}>
                <StatisticsIcon />
                <Typography variant={'regular14'}>Statistics</Typography>
              </DropDownItem>
              <DropDownItem className={s.item} onclick={getToFavoritesHandler}>
                <FavoritesIcon />
                <Typography variant={'regular14'}>Favorites</Typography>
              </DropDownItem>
              <DropDownItem className={s.item} onclick={logOutHandler}>
                <LogOutIcon />
                <Typography variant={'regular14'}>Log Out</Typography>
              </DropDownItem>
            </DropDownGroup>
          </div>
        </DropDownContent>
      </DropDown>
    </>
  )
})
