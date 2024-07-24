import * as React from 'react'
import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef, memo } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropDown.module.scss'

//компонент триггер
type DropDownTriggerProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownTriggerProps = DropDownTriggerProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownTriggerProps>

type DropDownTriggerWithRef = (
  props: OwnerDropDownTriggerProps,
  ref: ForwardedRef<any>
) => ReactNode
export const DropDownTrigger: DropDownTriggerWithRef = memo(
  forwardRef((props: OwnerDropDownTriggerProps, ref: ForwardedRef<any>) => {
    const { children, className } = props

    return (
      <DropdownMenu.Trigger asChild className={clsx(s.dropDownTrigger, className)} ref={ref}>
        {children}
      </DropdownMenu.Trigger>
    )
  })
)
