import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { TextField, TextFieldProps } from '../textfield'



type Props<T extends FieldValues> = Omit<
TextFieldProps,
  'disabled' | 'name' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const FormInput = <T extends FieldValues>({
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
    <TextField
      {...restProps}
      disabled={disabled}
      error={error?.message}
      name={fieldName}
      onBlur={onBlur}
      onValueChange={onChange}
      ref={ref}
      {...field}
    />
  )
}
