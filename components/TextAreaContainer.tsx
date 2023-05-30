'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'
import InputTextArea from './InputTextArea'
import OutputTextContainer from './OutputTextContainer'
import { db } from '@/firebase'
import useDebounce from '@/hooks/useDebounce'

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
    <div className="flex  flex-col lg:flex-row gap-2 min-h-[calc(100%-51px)] h-full lg:h-auto overflow-hidden">
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
