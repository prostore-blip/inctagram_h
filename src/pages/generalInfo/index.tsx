import { ReactNode } from 'react'

import { AvatarSelector } from '@/components/create-avatar/AvatarSelector'
import { BaseLayout } from '@/components/layouts/BaseLayout'

import DefaultAva from '../../../public/defaultAva.jpg'

export function GeneralInfo() {
  return <AvatarSelector initialValue={DefaultAva.src} onValueChange={(file: File | null) => {}} />
}

GeneralInfo.getLayout = function getLayout(page: ReactNode) {
  // the redirecting HOC could be here
  return <BaseLayout>{page}</BaseLayout>
}

export default GeneralInfo
