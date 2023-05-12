'use client'
import React from 'react'
import ToolbarContextProvider from '@/context/ToolbarContextProvider'

type Props = {
  children: React.ReactNode
}

const ClientProvider = ({ children }: Props) => {
  return <ToolbarContextProvider>{children}</ToolbarContextProvider>
}

export default ClientProvider
