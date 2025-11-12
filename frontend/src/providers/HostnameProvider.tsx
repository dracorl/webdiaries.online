"use client"

import {useEffect} from "react"
import {useAppStore} from "@/stores/appStore"

export const HostnameProvider = ({children}: {children: React.ReactNode}) => {
  const {setHostnamePrefix} = useAppStore()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.hostname.split(".")
      setHostnamePrefix(parts[0])
    }
  }, [setHostnamePrefix])

  return <>{children}</>
}
