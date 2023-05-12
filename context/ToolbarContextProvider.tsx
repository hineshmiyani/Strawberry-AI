'use client'
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
import {
  SparklesIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  HandThumbUpIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

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
    icon: PencilSquareIcon,
    active: true,
  },
  {
    name: 'rephrase it',
    title: 'Rephrase',
    icon: SparklesIcon,
    active: false,
  },
  {
    name: 'rewrite it',
    title: 'Rewrite',
    icon: ArrowPathIcon,
    active: false,
  },
  {
    name: 'make it standard',
    title: 'Standard',
    icon: DocumentDuplicateIcon,
    active: false,
  },
  {
    name: 'make it understadable',
    title: 'Understadable',
    icon: CogIcon,
    active: false,
  },
  {
    name: 'make it fluent',
    title: 'Fluent',
    icon: HandThumbUpIcon,
    active: false,
  },
  {
    name: 'make it simple',
    title: 'Simple',
    icon: FaceSmileIcon,
    active: false,
  },
  {
    name: 'make it concise',
    title: 'Concise',
    icon: FaceFrownIcon,
    active: false,
  },
  {
    name: 'make it creative',
    title: 'Creative',
    icon: UserCircleIcon,
    active: false,
  },
  {
    name: 'make it friendly',
    title: 'Friendly',
    icon: ChatBubbleLeftIcon,
    active: false,
  },
  {
    name: 'make it professional',
    title: 'Professional',
    icon: CogIcon,
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
