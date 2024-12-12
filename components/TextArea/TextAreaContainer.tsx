'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'

import { db } from '@/firebase'
import useDebounce from '@/hooks/useDebounce'

import InputTextArea from './InputTextArea'
import OutputTextContainer from './OutputTextContainer'

const TextAreaContainer = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams ? searchParams.get('id') || '' : ''

  const { data: session } = useSession()
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [prompt, isPromptLoading] = useDocumentData(
    session && promptId ? doc(db, 'users', session?.user?.email || '', 'prompts', promptId) : null
  )

  const isDebouncedPromptLoading = useDebounce(isPromptLoading, 300)

  return (
    <div className="flex  h-full min-h-[calc(100%-51px)] flex-col gap-2 overflow-hidden lg:h-auto lg:flex-row">
      <InputTextArea
        prompt={prompt}
        isPromptLoading={isDebouncedPromptLoading}
        isLoading={isLoading}
        setOutputText={setOutputText}
        setIsLoading={setIsLoading}
      />
      <OutputTextContainer
        isPromptLoading={isDebouncedPromptLoading}
        isLoading={isLoading}
        outputText={outputText}
      />
    </div>
  )
}

export default TextAreaContainer
