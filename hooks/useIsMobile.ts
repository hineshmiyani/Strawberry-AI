import { useMemo } from 'react'

const useIsMobile = () => {
  const isMobile = useMemo(
    () =>
      /iPhone|iPad|iPod|Mobi|Android/i.test(
        typeof window !== 'undefined' ? navigator?.userAgent : ''
      ),
    [typeof window !== 'undefined' ? window?.navigator?.userAgent : '']
  )

  return isMobile
}

export default useIsMobile
