import { Checkbox, CheckboxProps } from "@chrizzo/ui-kit"
import { FieldValues, useController, UseControllerProps } from "react-hook-form"




type Props<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'disabled' | 'name' | 'onBlur' | 'onCheckedChange' | 'ref'
> &
  UseControllerProps<T>

export const FormCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return <Checkbox {...restProps} checked={value} onCheckedChange={onChange} {...field} />
}
