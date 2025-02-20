/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next
import { useRouter } from 'next/router'

// ** Config
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

// ** Hook
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  // ** Auth
  const authContext = useAuth()

  // ** Router
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem(USER_DATA) && window.localStorage.getItem(ACCESS_TOKEN)) {
      router.replace('/')
    }
  }, [router.route])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
