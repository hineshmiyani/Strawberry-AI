'use client'
import React, { useState } from 'react'
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

const tabList = [
  {
    name: 'fixGrammar',
    title: 'Fix Grammar',
    icon: PencilSquareIcon,
  },
  {
    name: 'rephrase',
    title: 'Rephrase',
    icon: SparklesIcon,
  },
  {
    name: 'rewrite',
    title: 'Rewrite',
    icon: ArrowPathIcon,
  },
  {
    name: 'standard',
    title: 'Make Standard',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'fluent',
    title: 'Make Fluent',
    icon: HandThumbUpIcon,
  },
  {
    name: 'simple',
    title: 'Make Simple',
    icon: FaceSmileIcon,
  },
  {
    name: 'concise',
    title: 'Make Concise',
    icon: FaceFrownIcon,
  },
  {
    name: 'creative',
    title: 'Creative',
    icon: UserCircleIcon,
  },
  {
    name: 'friendly',
    title: 'Friendly',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: 'professional',
    title: 'Professional',
    icon: CogIcon,
  },
]

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('fixGrammar')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="flex w-64 bg-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center h-20 bg-blue-500">
          <h1 className="text-xl font-bold text-white">Grammar Checker</h1>
        </div>
        <div className="flex flex-col">
          {tabList?.map(({ name, title, icon: Icon }) => (
            <button
              key={name}
              className={`${
                activeTab === name
                  ? 'bg-blue-500 text-white opacity-100'
                  : 'text-gray-700 opacity-80'
              } flex items-center justify-between py-3 px-4 transition-opacity	 ease-in-out`}
              onClick={() => handleTabClick(name)}
            >
              <div className="flex items-center">
                <Icon className="mr-2 w-6 h-6" />
                <span>{title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
