'use client'
import React from 'react'
import useIsMobile from '@/hooks/useIsMobile'
import { useToolbarTabsContext } from '@/context/ToolbarContextProvider'

const TextEnhancementToolbar = () => {
  const isMobile = useIsMobile()
  const { tabs, setTabs } = useToolbarTabsContext()

  const handleTabClick = (tabName: string) => {
    setTabs((currentTabs) => {
      const updatedTabs = currentTabs?.map((tab) => {
        if (tab?.name === tabName) {
          return { ...tab, active: !tab?.active }
        }
        return tab
      })
      return updatedTabs
    })
  }

  return (
    <div
      className={`mb-2 flex gap-3.5 overflow-x-auto rounded-xl ${
        isMobile ? 'no-scrollbar' : 'pb-1.5'
      }`}
    >
      {tabs?.map(({ name, title, active }) => (
        <button
          key={name}
          className={`${
            active ? 'bg-lightPink text-textPink' : 'text-textDarkBlue opacity-90'
          } flex flex-shrink-0 cursor-pointer select-none items-center justify-between rounded-xl px-3 py-1.5 font-medium transition-colors duration-100 ease-in-out`}
          onClick={() => handleTabClick(name)}
        >
          <div className="flex items-center">
            <span>{title}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default TextEnhancementToolbar
