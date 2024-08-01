import { Bookmark, Create, Home, LogOut, Message, Person, Search, TrendingUp } from '@/assets/icons'
import { PropsLink } from '@/components/nav/types'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './nav.module.scss'

const links: PropsLink[] = [
  {
    icon: <Home />,
    name: 'Home',
    path: '/',
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
}

export const Nav = ({ isSpecialAccount }: Props) => {
  const handleClick = (isButton?: boolean) => {
    if (isButton) {
      alert(9)
    }
  }

  return (
    <nav className={s.navWrapper}>
      <ul className={s.navList}>
        {links.map((link, index) => {
          const isStatisticsLink = link.name === 'Statistics'
          const shouldHide = isStatisticsLink && !isSpecialAccount

          return (
            <li
              className={clsx(s.navItem, s[`navItem${index + 1}`], shouldHide && s.hidden)}
              key={index}
            >
              <Button
                as={link.isButton ? 'button' : Link}
                className={s.wrapper}
                href={link.path}
                onClick={() => handleClick(link.isButton)}
                variant={'text'}
              >
                {link.icon}
                <Typography as={'span'} variant={'regularMedium14'}>
                  {link.name}
                </Typography>
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
