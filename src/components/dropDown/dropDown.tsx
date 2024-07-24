import * as React from 'react'
import { FC, memo } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const DropDown: FC<React.ComponentPropsWithoutRef<typeof DropdownMenu.Root>> = memo(
  ({ children, ...rest }) => {
    return <DropdownMenu.Root {...rest}>{children}</DropdownMenu.Root>
  }
)
