'use client'
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type Props = {
  children: React.ReactNode
}

type DefaultContextValue = {
  tabs: typeof defaultTabs
  setTabs: Dispatch<SetStateAction<typeof defaultTabs>>
}

const defaultTabs = [
  {
    name: 'fix grammar',
    title: 'Fix Grammar',
    active: true,
  },
  {
    name: 'rephrase it',
    title: 'Rephrase',
    active: false,
  },
  {
    name: 'rewrite it',
    title: 'Rewrite',
    active: false,
  },
  {
    name: 'make it standard',
    title: 'Standard',
    active: false,
  },
  {
    name: 'make it more understadable',
    title: 'Understadable',
    active: false,
  },
  {
    name: 'make it fluent',
    title: 'Fluent',
    active: false,
  },
  {
    name: 'make it simple',
    title: 'Simple',
    active: false,
  },
  {
    name: 'make it concise',
    title: 'Concise',
    active: false,
  },
  {
    name: 'make it creative',
    title: 'Creative',
    active: false,
  },
  {
    name: 'make it friendly',
    title: 'Friendly',
    active: false,
  },
  {
    name: 'make it professional',
    title: 'Professional',
    active: false,
  },
]

const defaultContextValue: DefaultContextValue = {
  tabs: defaultTabs,
  setTabs: () => defaultTabs,
}

const ToolbarContext = createContext(defaultContextValue)

export const useToolbarTabsContext = () => useContext(ToolbarContext)

const ToolbarContextProvider = ({ children }: Props) => {
  const [tabs, setTabs] = useState<typeof defaultTabs>(defaultTabs)

  return (
    <ToolbarContext.Provider
      value={{
        tabs,
        setTabs,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  )
}

export default ToolbarContextProvider
