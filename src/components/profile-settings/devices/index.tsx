import { Chrome } from '@/assets/icons'
import { ActiveSessionsList } from '@/components/profile-settings/devices/ActiveSessions'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useDeleteAllSessionsMutation,
  useGetAllSessionsQuery,
} from '@/services/inctagram.sessions.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from './devicesSessionsContent.module.scss'

type Props = {}
export const DevicesSessionsContent = ({}: Props) => {
  /**
   * интернацинализация
   */
  const { t } = useTranslation()

  /**
   * Запрос за текущей и активными сессиями
   */
  const { data: sessions } = useGetAllSessionsQuery()
  /**
   * запрос для удаления активных сессий, кроме текущей
   */
  const [deleteAllSessions] = useDeleteAllSessionsMutation()

  const deleteSessionsHandler = () => {
    deleteAllSessions()
  }

  return (
    <TabsPrimitive.Content value={'devices'}>
      <div className={s.devicesWr}>
        <div className={s.currentDevice}>
          <Typography variant={'h3'}>{t.profile.devices.currentDevice}</Typography>
          <div className={s.browser}>
            <Chrome />
            <div className={s.typeBrouserAndIP}>
              <Typography variant={'regularBold16'}>{sessions?.current.browserName}</Typography>
              <Typography variant={'regular14'}>IP:{sessions?.current.ip}</Typography>
            </div>
          </div>
        </div>
        <div className={s.terminateButton}>
          <Button onClick={deleteSessionsHandler} type={'button'} variant={'outline'}>
            {t.profile.devices.terminateAllSessions}
          </Button>
        </div>
        <div className={s.activeSessions}>
          <Typography variant={'h3'}>{t.profile.devices.activeSessions}</Typography>
          <ul className={s.activeSessionsWr}>
            <ActiveSessionsList
              mySessionId={sessions?.current.deviceId}
              sessions={sessions?.others}
            />
          </ul>
        </div>
      </div>
    </TabsPrimitive.Content>
  )
}
