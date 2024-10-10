import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { SearchInputValueType } from '@/components/modal-followers/types'

export const useDebounceFollowers = (setFn: Dispatch<SetStateAction<SearchInputValueType>>) => {
  /**
   * номер таймера из функции задержки посыла текста из инпута на сервер
   */
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  return useCallback(
    (inputData: string) => {
      setFn(prev => ({ ...prev, search: inputData }))
      clearTimeout(timerId)
      const idTimer = setTimeout(() => {
        setFn(prev => ({ ...prev, textFromDebounceInput: inputData }))
      }, 1500)

      setTimerId(+idTimer)
    },
    [timerId]
  )
}
