import { clsx } from 'clsx'

import s from './spinner.module.scss'
type Props = {
  active?: boolean
  color?: string
  size: number
}

const Spinner = ({ active = false, color, size }: Props) => {
  const spinnerThickness = Math.floor(size / 5)
  const spinnerColor = color ? color : 'var(--color-accent-500)'

  return (
    <>
      <span
        className={clsx(s.container, !active && s.noDisplay)}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        <span
          className={s.loader}
          style={{
            border: `${spinnerThickness}px solid ${spinnerColor}`,
            borderBottomColor: 'transparent',
          }}
        />
      </span>
    </>
  )
}

export default Spinner
