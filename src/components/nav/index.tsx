import { Bookmark, Create, Home, LogOut, Message, Person, Search, TrendingUp } from '@/assets/icons'
import { ModalConfirmLogout } from '@/components/modalConfirmLogout'
import { ModalCreatePost } from '@/components/modalCreatePost'
import { PropsLink } from '@/components/nav/types'
import { useLogout } from '@/hooks/useLogout'
import { useGetMyCurrentSubscriptionQuery } from '@/services/inctagram.subscriptions.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './nav.module.scss'

const links: PropsLink[] = [
  {
    icon: <Home />,
    name: 'Home',
    path: '/home',
  },
  {
    icon: <Create />,
    isButton: true,
    name: 'Create',
    path: '/create',
  },
  {
    icon: <Person />,
    name: 'My Profile',
    path: '/profile',
  },
  {
    icon: <Message />,
    name: 'Messenger',
    path: '/messenger',
  },
  {
    icon: <Search />,
    name: 'Search',
    path: '/search',
  },
  {
    icon: <TrendingUp />,
    name: 'Statistics',
    path: '/statistics',
  },
  {
    icon: <Bookmark />,
    name: 'Favorites',
    path: '/favorites',
  },
  {
    icon: <LogOut />,
    isButton: true,
    name: 'Log Out',
    path: '/logout',
  },
]

type Props = {
  isSpecialAccount: boolean
  myEmail: string | undefined
  myProfileId: number | undefined
}

export const Nav = ({ isSpecialAccount, myEmail, myProfileId }: Props) => {
  const router = useRouter()
  /**
   * запрос за проверкой подписки (для отображения вкладки статистики)
   */
  const { data } = useGetMyCurrentSubscriptionQuery()

  /**
   * кастомный хук вылогинивания
   */
  const { getLogout, isLoading } = useLogout()

  /**
   *  Обработчик кнопок меню nav. На данный момент обрабатывется только для "logout"
   * @param isButton - является ли кнопка меню NAV кнопкой (может быть ссылка)
   * @param linkName - название кнопки меню NAV
   */
  const handleClick = (isButton?: boolean, linkName?: string) => {
    if (isButton && linkName === 'Log Out') {
      getLogout()
    }
  }

  return (
    <nav className={s.navWrapper}>
      <ul className={s.navList}>
        {links.map((link, index) => {
          const isStatisticsLink = link.name === 'Statistics'
          const shouldHide = isStatisticsLink && !isSpecialAccount
          const activeLink =
            router.pathname.includes(link.path.slice(1)) && link.path.slice(1).length > 0

          const hiddenStaticticsStyle = link.name === 'Statistics' && !data?.data.length

          return (
            <li
              className={clsx(
                s.navItem,
                s[`navItem${index + 1}`],
                shouldHide && s.hidden,
                hiddenStaticticsStyle && s.hidden
              )}
              key={index}
            >
              {link.name === 'Create' && (
                <ModalCreatePost
                  trigger={
                    <Button
                      as={link.isButton ? 'button' : Link}
                      className={clsx(s.wrapper, activeLink && s.activeLink)}
                      disabled={isLoading}
                      href={link.path}
                      variant={'text'}
                    >
                      {link.icon}
                      <Typography as={'span'} variant={'regularMedium14'}>
                        {link.name}
                      </Typography>
                    </Button>
                  }
                />
              )}

              {link.name === 'Log Out' && (
                <ModalConfirmLogout
                  callback={handleClick}
                  link={link}
                  title={'Log Out'}
                  variantTriggerButton={
                    <Button
                      as={link.isButton ? 'button' : Link}
                      className={clsx(s.wrapper, activeLink && s.activeLink)}
                      disabled={isLoading}
                      href={link.path}
                      // onClick={() => handleClick(link.isButton, link.name)}
                      variant={'text'}
                    >
                      {link.icon}
                      <Typography as={'span'} variant={'regularMedium14'}>
                        {link.name}
                      </Typography>
                    </Button>
                  }
                >
                  <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
                    Are you really want to log out of your account &quot;
                    <Typography as={'span'} className={s.userName} variant={'h3'}>
                      {myEmail}
                    </Typography>
                    &quot;?
                  </Typography>
                </ModalConfirmLogout>
              )}
              {link.name !== 'Log Out' && link.name !== 'Create' && (
                <Button
                  as={link.isButton ? 'button' : Link}
                  className={clsx(s.wrapper, activeLink && s.activeLink)}
                  disabled={isLoading}
                  href={link.path}
                  onClick={() => handleClick(link.isButton, link.name)}
                  variant={'text'}
                >
                  {link.icon}
                  <Typography as={'span'} variant={'regularMedium14'}>
                    {link.name}
                  </Typography>
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
