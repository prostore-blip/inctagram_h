//компонент Item
import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef, memo } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropDown.module.scss'

type DropDownItemProps = {
  children?: ReactNode
  className?: string
  onclick?: () => void
}

type OwnerDropDownItemProps = DropDownItemProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownItemProps>

type DropDownItemWithRef = (props: OwnerDropDownItemProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownItem: DropDownItemWithRef = memo(
  forwardRef((props: OwnerDropDownItemProps, ref: ForwardedRef<any>) => {
    const { children, className, onclick } = props

    return (
      <DropdownMenu.Item
        className={clsx(s.dropDownItem, className)}
        onSelect={e => {
          e.preventDefault()
          onclick && onclick()
        }}
        ref={ref}
      >
        {children}
      </DropdownMenu.Item>
    )
  })
)
