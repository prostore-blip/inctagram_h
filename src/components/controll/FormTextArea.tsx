import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@chrizzo/ui-kit'

type Props<T extends FieldValues> = Omit<
  TextAreaProps,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const FormTextArea = <T extends FieldValues>({
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

  return (
    <TextArea
      {...restProps}
      disabled={disabled}
      errorMessage={error?.message}
      name={fieldName}
      onBlur={onBlur}
      onValueChange={onChange}
      ref={ref}
      {...field}
    />
  )
}
