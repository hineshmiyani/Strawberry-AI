'use client'
import React, { useState } from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { toast } from 'react-hot-toast'
import Skeleton from '../Fallback/Skeleton'
import useIsMobile from '@/hooks/useIsMobile'

type Props = {
  isPromptLoading: boolean
  isLoading: boolean
  outputText: string
}

const OutputTextContainer = ({ isPromptLoading, isLoading, outputText }: Props) => {
  const isMobile = useIsMobile()
  const [toolTipContent, setToolTipContent] = useState('Click to copy!')
  const [toolTipVisible, setToolTipVisible] = useState(false)

  const handleCopyOutput = () => {
    navigator.clipboard.writeText((outputText || '')?.trim())
    setToolTipContent('Copied!')

    if (isMobile) {
      toast.success('Text Copied!', {
        style: {
          borderRadius: '32px',
          border: `1px solid #f5f6fc`,
        },
        duration: 2000,
      })
    }

    setTimeout(() => setToolTipContent('Click to copy!'), 2000)
  }

  return (
    <div className="h-auto  min-h-[calc(50%-32px)]  w-full rounded-xl bg-[#f5f6fc] p-4  text-textPrimary lg:min-h-[50%]">
      <div className="flex h-full w-full flex-col justify-between bg-inherit outline-none">
        <div className="h-full">
          {isLoading || isPromptLoading ? (
            <Skeleton />
          ) : (
            <textarea
              name="text"
              className="h-full w-full resize-none whitespace-break-spaces bg-inherit pr-2 caret-transparent outline-none"
              value={outputText}
              spellCheck={false}
            />
          )}
        </div>

        {outputText && !isLoading && !isPromptLoading ? (
          <Tippy
            content={toolTipContent}
            visible={isMobile ? false : toolTipVisible}
            placement="left"
          >
            <button
              className="hover:shadow-outline-pink ml-auto mt-2 w-fit rounded-full bg-lightPink p-2.5 text-textPink  transition-all delay-0  duration-[150] ease-in"
              onClick={handleCopyOutput}
              onMouseEnter={() => setToolTipVisible(true)}
              onMouseLeave={() => {
                setToolTipVisible(false)
              }}
            >
              <DocumentDuplicateIcon className="h-5 w-5" />
            </button>
          </Tippy>
        ) : null}
      </div>
    </div>
  )
}

export default OutputTextContainer
