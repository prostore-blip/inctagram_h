import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (
  { height = 10, width = 7, ...rest }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill={'currentColor'}
    height={height}
    ref={ref}
    viewBox={'0 0 7 10'}
    width={width}
    xmlns={'http://www.w3.org/2000/svg'}
    {...rest}
  >
    <path d={'M5 10L0 5L5 0L6.062 1.062L2.125 5L6.062 8.938L5 10Z'} fill={'currentColor'} />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
