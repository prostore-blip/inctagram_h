import {
  Bookmark,
  Home,
  LogOut,
  Message,
  Person,
  PlusSquare,
  Search,
  TrendingUp,
} from '@/assets/icons'
import { PropsLink } from '@/components/Nav/types'
import { Typography } from '@chrizzo/ui-kit'
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
    icon: <PlusSquare />,
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
    name: 'Log Out',
    path: '/logout',
  },
]

type Props = {
  isSpecialAccount: boolean
}

export const Nav = ({ isSpecialAccount }: Props) => {
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
              <Link className={s.wrapper} href={link.path}>
                {link.icon}
                <Typography as={'span'} variant={'medium_text_14'}>
                  {link.name}
                </Typography>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
