'use client'
import React, { useState } from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Skeleton from './Skeleton'

type Props = {
  isPromptLoading: boolean
  isLoading: boolean
  outputText: string
}

const OutputTextContainer = ({ isPromptLoading, isLoading, outputText }: Props) => {
  const [toolTipContent, setToolTipContent] = useState('Click to copy!')
  const [toolTipVisible, setToolTipVisible] = useState(true)

  const handleCopyOutput = () => {
    navigator.clipboard.writeText((outputText || '')?.replace(/.*\n\n/g, '')?.trim())
    setToolTipContent('Copied!')
    setTimeout(() => setToolTipContent('Click to copied!'), 2000)
  }

  return (
    <div className="p-4  h-auto  min-h-[calc(50%-32px)] lg:min-h-[50%] w-full rounded-xl  bg-[#f5f6fc] text-textPrimary">
      <div className="bg-inherit w-full h-full outline-none flex flex-col justify-between">
        <div className="h-full">
          {isLoading || isPromptLoading ? (
            <Skeleton />
          ) : (
            <textarea
              name="text"
              className="pr-2 bg-inherit w-full h-full resize-none outline-none whitespace-break-spaces caret-transparent"
              value={outputText?.replace(/.*\n\n/g, '')}
              spellCheck={false}
            />
          )}
        </div>

        {outputText?.replace(/.*\n\n/g, '') ? (
          <Tippy content={toolTipContent} visible={toolTipVisible} placement="left">
            <button
              className="mt-2 w-fit ml-auto p-2.5 bg-lightPink text-textPink rounded-full transition-all  duration-[150] ease-in  delay-0 hover:shadow-outline-pink"
              onClick={handleCopyOutput}
              onMouseEnter={() => setToolTipVisible(true)}
              onMouseLeave={() => {
                setToolTipVisible(false)
              }}
            >
              <DocumentDuplicateIcon className="w-5 h-5" />
            </button>
          </Tippy>
        ) : null}
      </div>
    </div>
  )
}

export default OutputTextContainer
