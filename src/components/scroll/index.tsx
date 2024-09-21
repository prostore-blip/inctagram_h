import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './scroll.module.scss'
type VariantRootType = 'always' | 'auto' | 'hover' | 'scroll'
export type ScrollProps = {
  children?: ReactNode
  height?: string
  padding?: string
  variant?: VariantRootType
  width?: string
} & ComponentPropsWithoutRef<typeof ScrollArea.Root>

export const Scroll = ({
  children,
  className,
  height,
  padding = '0px',
  variant = 'hover',
  width,
}: ScrollProps) => {
  return (
    <>
      <ScrollArea.Root
        className={clsx(s.root, className)}
        scrollHideDelay={100}
        style={{ height, padding, width }}
        type={variant}
      >
        <ScrollArea.Viewport className={s.viewport}>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar className={s.horizontal} orientation={'horizontal'}>
          <ScrollArea.Thumb className={s.thumb2} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className={s.vertical} orientation={'vertical'}>
          <ScrollArea.Thumb className={s.thumb1} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </>
  )
}
