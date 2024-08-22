import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Typography } from '@chrizzo/ui-kit'
import { clsx } from 'clsx'

import s from './textarea.module.scss'

export type CustomProps = {
  autoHeight?: boolean
  errorMessage?: string
  label?: string
  maxHeight?: number
  onEnter?: () => void
  onValueChange?: (value: string) => void
  resizeable?: 'both' | 'horizontal' | 'none' | 'vertical'
}

export type TextAreaProps = CustomProps &
  Omit<ComponentPropsWithoutRef<'textarea'>, keyof CustomProps>

export const TextArea = forwardRef<ElementRef<'textarea'>, TextAreaProps>(
  (
    {
      autoHeight = false,
      className,
      disabled,
      errorMessage,
      id,
      label,
      maxHeight,
      onBlur,
      onChange,
      onClick,
      onEnter,
      onValueChange,
      resizeable = 'none',
      rows,
      value,
      ...restProps
    },
    forwardedRef
  ) => {
    const [active, setActive] = useState(false)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const initialHeight = useRef<null | number>(null)

    useEffect(() => {
      if (textAreaRef?.current) {
        if (!textAreaRef?.current?.value) {
          initialHeight.current = textAreaRef.current.offsetHeight
        }
        if (textAreaRef?.current?.value) {
          const requiredHeight = getRequiredHeight(textAreaRef)

          if (maxHeight && autoHeight && requiredHeight) {
            requiredHeight <= maxHeight
              ? (textAreaRef.current.style.height = `${requiredHeight}px`)
              : (textAreaRef.current.style.height = `${maxHeight}px`)
          }
          if (!maxHeight && autoHeight) {
            requiredHeight && (textAreaRef.current.style.height = `${requiredHeight + 12}px`)
          }
        }
      }
    }, [])

    useImperativeHandle(
      forwardedRef,
      () =>
        ({
          ...textAreaRef.current,
        }) as HTMLTextAreaElement
    )

    const autoId = useId()

    if (maxHeight && !autoHeight) {
      throw new Error('maxHeight makes sense only with autoHeight=true')
    }
    if (maxHeight && maxHeight < 0) {
      throw new Error('Wrong maxHeight value')
    }

    if (maxHeight && rows && initialHeight?.current && initialHeight.current > maxHeight) {
      throw new Error(
        `Wrong maxHeight value: pass maxHeight value which exceeds ${initialHeight.current}px`
      )
    }

    const handleAreaTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
      !active && setActive(true)
      onChange && onChange(event)
      onValueChange && onValueChange(event.currentTarget.value)
      if (!autoHeight) {
        return
      }
      if (!textAreaRef?.current) {
        return
      }

      const currentHeight = textAreaRef.current.offsetHeight

      if (!maxHeight) {
        const requiredHeight = getRequiredHeight(textAreaRef)

        textAreaRef.current.style.height =
          currentHeight > requiredHeight ? `${currentHeight}px` : `${requiredHeight}px`

        return
      }

      if (currentHeight && maxHeight) {
        const requiredHeight = getRequiredHeight(textAreaRef)

        if (requiredHeight <= maxHeight && currentHeight < requiredHeight) {
          textAreaRef.current.style.height = `${requiredHeight}px`
        } else {
          textAreaRef.current.style.height = `${currentHeight}px`
        }
      }
    }

    const handleEnterKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (onEnter && event.key === 'Enter') {
        onEnter()
      }
    }

    const handleClick = (e: MouseEvent<HTMLTextAreaElement>) => {
      onClick && onClick(e)
      setActive(true)
    }

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(e)
      setActive(false)
    }

    const cn = {
      area: clsx(
        s.area,
        active && s.active,
        errorMessage && s.errorInput,
        s[resizeable],
        className
      ),
      container: clsx(s.container, disabled && s.disabled),
      error: clsx(!errorMessage && s.transparent),
      label: clsx(s.label, disabled && s.disabled),
    }

    return (
      <div className={cn.container}>
        <Typography as={'label'} className={cn.label} htmlFor={id || autoId} variant={'regular14'}>
          {label}
        </Typography>
        <textarea
          aria-describedby={`${id || autoId}-field-message`}
          className={cn.area}
          disabled={disabled}
          id={id || autoId}
          onBlur={handleBlur}
          onChange={handleAreaTextChange}
          onClick={handleClick}
          onKeyDown={handleEnterKeyPress}
          ref={textAreaRef}
          rows={rows || 1}
          style={{ resize: resizeable }}
          value={value}
          {...restProps}
        />
        {errorMessage && (
          <Typography
            aria-live={'assertive'}
            className={cn.error}
            id={`${id || autoId}-field-message`}
            variant={'small'}
          >
            {errorMessage}
          </Typography>
        )}
        {!errorMessage && (
          <Typography className={s.transparent} variant={'regular14'}>
            placeholder
          </Typography>
        )}
      </div>
    )
  }
)

function getRequiredHeight(ref: RefObject<any>) {
  if (!ref?.current) {
    return null
  }
  const styles = getComputedStyle(ref?.current)
  const valueString = styles.getPropertyValue('padding')
  const paddingNumber = Number.parseInt(valueString)

  const offsetHeight = ref.current.offsetHeight
  // const clientHeight = ref.current.clientHeight

  ref.current.style.height = '0px'
  const { scrollHeight: requiredHeight } = ref.current

  ref.current.style.height = `${offsetHeight}px`

  return requiredHeight + paddingNumber
}
