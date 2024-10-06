import { LogOut, Mobile } from '@/assets/icons'
import { Decstop } from '@/assets/icons/decstop'
import { ModalConfirmLogout } from '@/components/modalConfirmLogout'
import { useLogout } from '@/hooks/useLogout'
import { useTranslation } from '@/hooks/useTranslation'
import { useDeleteSessionByIdMutation } from '@/services/inctagram.sessions.service'
import { CurrentSession } from '@/services/types'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'

import s from '@/components/profile-settings/devices/devicesSessionsContent.module.scss'
import st from '@/components/profile-settings/devices/logoutConfirm.module.scss'

import { useAppSelector } from '../../../../store'

type Props = {
  mySessionId: number | undefined
  sessions: CurrentSession[] | undefined
}
export const ActiveSessionsList = ({ mySessionId, sessions }: Props) => {
  /**
   * имя почты из стора редакса. Используется в модалке подтверждения logOut'а
   */
  const myEmail = useAppSelector(state => state.auth.authData.myEmail)
  /**
   * интернацинализация
   */
  const { t } = useTranslation()
  /**
   * запрос за удалением конкретной сессии по её id
   */
  const [deleteSessionById] = useDeleteSessionByIdMutation()
  /**
   * кастомный хук вылогинивания
   */
  const { getLogout } = useLogout()

  return sessions?.map(device => {
    /**
     * обработчик кнопки удаления сессии
     */
    const logOutHandler = () => {
      if (mySessionId === device.deviceId) {
        getLogout()
      } else {
        deleteSessionById(device.deviceId)
      }
    }

    return (
      <li className={s.device} key={device.deviceId}>
        {device.osName === 'Windows' ? <Decstop /> : <Mobile />}
        <div className={s.deviceTypeAndIP}>
          <Typography variant={'regularBold16'}>Apple iMac 27</Typography>
          <Typography variant={'regular14'}>IP:{device.ip}</Typography>
          <Typography variant={'small'}>
            {t.profile.devices.lstVisit}: {device.lastActive}
          </Typography>
        </div>
        <div className={s.logoutButtonWr}>
          <ModalConfirmLogout
            callback={logOutHandler}
            title={'Log Out'}
            variantTriggerButton={
              <Button as={'button'} className={clsx(st.wrapper)} variant={'text'}>
                <LogOut />
                <Typography as={'span'} variant={'regularMedium14'}>
                  Log Out
                </Typography>
              </Button>
            }
          >
            <Typography as={'span'} className={st.questionConfirm} variant={'regular16'}>
              Are you really want to log out of your account &quot;
              <Typography as={'span'} className={st.userName} variant={'h3'}>
                {myEmail}
              </Typography>
              &quot;?
            </Typography>
          </ModalConfirmLogout>
        </div>
      </li>
    )
  })
}
