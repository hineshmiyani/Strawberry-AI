'use client'
import React from 'react'
import Skeleton from './Skeleton'

type Props = {
  isPromptLoading: boolean
  isLoading: boolean
  outputText: string
}

const OutputTextContainer = ({ isPromptLoading, isLoading, outputText }: Props) => {
  return (
    <div className="p-4  h-auto  min-h-[calc(50%-32px)] lg:min-h-[50%] w-full rounded-xl  bg-[#f5f6fc] text-textPrimary">
      <div className="pr-2 bg-inherit w-full h-full outline-none">
        {isLoading || isPromptLoading ? (
          <Skeleton />
        ) : (
          <p className="whitespace-break-spaces">{outputText?.replace(/.*\n\n/g, '')}</p>
        )}
      </div>
    </div>
  )
}

export default OutputTextContainer
