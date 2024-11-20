import { clsx } from 'clsx'

import s from './spinner.module.scss'
type Props = {
  active?: boolean
  color?: string
  size: number
  thickness?: number
}

const Spinner = ({ active = false, color, size, thickness }: Props) => {
  const spinnerThickness = Math.floor(thickness || size * 0.05 > 2 ? size * 0.05 : 2)
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
