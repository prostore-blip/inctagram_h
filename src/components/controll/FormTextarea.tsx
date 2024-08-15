import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreatype } from '@chrizzo/ui-kit'

type Props<T extends FieldValues> = Omit<
  TextAreatype,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const FormTextarea = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field: { name: fieldName, onBlur, onChange, ref, ...field },
    fieldState: { error },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    onChange && onChange(value)
  }

  //todo add forwardRef, remove polymorph(?), fix Props type, placeholder shouldn't be mandatory
  return (
    <TextArea
      {...restProps}
      disabled={disabled}
      name={fieldName}
      onBlur={onBlur}
      onChange={handleValueChange}
      // ref={ref}
      {...field}
    />
  )
}
