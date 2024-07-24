import * as React from 'react'
import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef, memo } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropDown.module.scss'

//компонент Group
type DropDownGroupProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownGroupProps = DropDownGroupProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownGroupProps>

type DropDownGroupWithRef = (props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownGroup: DropDownGroupWithRef = memo(
  forwardRef((props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => {
    const { children, className } = props

    return (
      <DropdownMenu.Group className={clsx(s.dropDownGroup, className)} ref={ref}>
        {children}
      </DropdownMenu.Group>
    )
  })
)
