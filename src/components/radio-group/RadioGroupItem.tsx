import * as React from 'react'
import { memo } from 'react'

import { Typography } from '@chrizzo/ui-kit'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import s from './radioGroupItem.module.scss'
type Props = {
  variant: Parameters<typeof Typography>[0]['variant']
}
export const RadioGroupItem = memo(
  React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    Props & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
  >(({ children, ...props }, ref) => {
    return (
      <div className={s.divItem}>
        <RadioGroupPrimitive.Item className={s.RadioGroupItem} ref={ref} {...props}>
          <RadioGroupPrimitive.Indicator className={s.radioGroupIndicator}>
            {children}
          </RadioGroupPrimitive.Indicator>
          {!props.checked && children}
        </RadioGroupPrimitive.Item>
        <Typography variant={props.variant}>
          <label
            className={`${s.label} ${props.disabled ? s.labelDisabled : ''}`}
            htmlFor={props.id}
          >
            {props.title}
          </label>
        </Typography>
      </div>
    )
  })
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
