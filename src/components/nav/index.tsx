import { useMemo } from 'react'

import { Bookmark, Create, Home, LogOut, Message, Person, Search, TrendingUp } from '@/assets/icons'
import { ModalCreatePost } from '@/components/modalCreatePost'
import { MainNavigationItem } from '@/components/nav/types'
import { useLogoutMutation } from '@/services'
import { useGetMySubscriptionsQuery } from '@/services/inctagram-work-api/inctagram.subscriptions.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './nav.module.scss'

type Props = {
  isSpecialAccount?: boolean
}

export const Nav = ({ isSpecialAccount = false }: Props) => {
  const router = useRouter()
  const [logout] = useLogoutMutation()
  /**
   * запрос за проверкой подписки (для отображения вкладки статистики)
   */
  const { data } = useGetMySubscriptionsQuery()

  const links: MainNavigationItem[] = useMemo(
    () => [
      {
        icon: <Home />,
        name: 'Home',
        path: '/',
      },
      {
        icon: <Create />,
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
        action: logout,
        icon: <LogOut />,
        name: 'Log Out',
        //it is possible to create a page with useEffect
        // path: '/logout',
      },
    ],
    []
  )

  //todo there is layout examples in shadcn
  return (
    <nav className={s.navWrapper}>
      <ul className={s.navList}>
        {links.map((link, index) => {
          const isStatisticsLink = link.name === 'Statistics'
          const shouldHide = isStatisticsLink && !isSpecialAccount
          const activeLink =
            link?.path && link.path.length > 2
              ? router.pathname.startsWith(link.path)
              : link.path === router.pathname //undefined !== string
          const hiddenStaticticsStyle = link.name === 'Statistics' && !data?.length

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
                      className={clsx(s.wrapper, activeLink && s.activeLink)}
                      // disabled={isLoading}
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
              {link.action && link.name !== 'Create' && (
                <Button
                  className={clsx(s.wrapper, activeLink && s.activeLink)}
                  onClick={link.action}
                  variant={'text'}
                >
                  {link.icon}
                  <Typography as={'span'} variant={'regularMedium14'}>
                    {link.name}
                  </Typography>
                </Button>
              )}
              {link.path && link.name !== 'Create' && (
                <Button
                  as={Link}
                  className={clsx(s.wrapper, activeLink && s.activeLink)}
                  href={link.path}
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
