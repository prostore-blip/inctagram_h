import { clsx } from 'clsx'

import s from './linearProgress.module.scss'

type Props = {
  active: boolean
  thickness?: number
}
const LinearProgress = ({ active, thickness = 2 }: Props) => {
  return (
    <>
      <span className={clsx(s.loader, !active && s.hidden)} style={{ height: `${thickness}px` }} />
    </>
  )
}

export default LinearProgress
