'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import ToolbarContextProvider from '@/context/ToolbarContextProvider'

type Props = {
  children: React.ReactNode
}

const ClientProvider = ({ children }: Props) => {
  return (
    <ToolbarContextProvider>
      {children}
      <Toaster position="bottom-center" containerStyle={{ bottom: 40 }} />
    </ToolbarContextProvider>
  )
}

export default ClientProvider
