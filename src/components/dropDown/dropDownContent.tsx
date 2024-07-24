import * as React from 'react'
import { ReactNode, memo } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropDown.module.scss'

//компонент портал и контент
type DropDownContentProps = {
  children: ReactNode
  disabled?: boolean
  label?: string
}

export const DropDownContent = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenu.Content>,
    DropDownContentProps & React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
  >((props, ref) => {
    const { children, className = '', disabled, label, ...restprops } = props

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(s.dropDownContent, className)}
          ref={ref}
          {...restprops}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    )
  })
)
