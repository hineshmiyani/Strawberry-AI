'use client'
import React, { useState } from 'react'
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
      className={`mb-2 flex gap-3.5 rounded-xl overflow-x-auto ${
        isMobile ? 'no-scrollbar' : 'pb-1.5'
      }`}
    >
      {tabs?.map(({ name, title, active }) => (
        <button
          key={name}
          className={`${
            active ? 'bg-lightPink text-textPink' : 'text-[#0a192f] opacity-90'
          } px-3 py-1.5 font-medium flex items-center justify-between rounded-xl duration-200 select-none cursor-pointer flex-shrink-0 `}
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
