'use client'
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { DocumentData, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Spinner from './Spinner'
import Skeleton from './Skeleton'
import { useToolbarTabsContext } from '@/context/ToolbarContextProvider'
import { db } from '@/firebase'

type Props = {
  prompt: DocumentData | undefined
  isPromptLoading: boolean
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setOutputText: Dispatch<SetStateAction<string>>
}

const InputTextArea = ({
  prompt,
  isPromptLoading,
  isLoading,
  setIsLoading,
  setOutputText,
}: Props) => {
  const { data: session } = useSession()
  const { tabs, setTabs } = useToolbarTabsContext()
  const [inputText, setInputText] = useState('')

  const model = 'text-davinci-003'
  const activeTabs = useMemo(() => tabs?.filter((tab) => tab?.active), [tabs])

  useEffect(() => {
    if (prompt) {
      setOutputText(prompt?.output)
      setInputText(prompt?.input)
      setTabs((tabs) => {
        const updatedTabs = tabs.map((tab) => {
          return prompt?.tags?.includes(tab?.name)
            ? { ...tab, active: true }
            : { ...tab, active: false }
        })
        return updatedTabs
      })
    }
  }, [prompt])

  const addPrompt = async (prompt: Prompt) => {
    try {
      await addDoc(collection(db, 'users', session?.user?.email || '', 'prompts'), prompt)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputText) return

    setIsLoading(true)

    const prefixText = activeTabs
      ?.reduce((prevValue, currValue) => `${prevValue}  ${currValue?.name},`, 'Please')
      ?.slice(0, -1)

    const activeTabNames = activeTabs?.map((tab) => tab?.name)

    const trimmedInput = inputText.trim()
    const combinedInputText = `${prefixText} to below message: \n\n${trimmedInput}`

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: combinedInputText,
        model,
        session,
      }),
    }).then(async (res) => {
      const data = await res?.json()

      const prompt: Prompt = {
        input: trimmedInput,
        output: data?.choices?.[0]?.text || 'Strawberry.ai was unable to repharse your text!',
        createdAt: serverTimestamp(),
        tags: activeTabNames,
        isSaved: false,
      }

      if (session?.user?.email) {
        await addPrompt(prompt)
      }

      setOutputText(prompt?.output)
      setIsLoading(false)
    })
  }

  return (
    <div className="p-4 pb-[60px] h-auto  min-h-[calc(50%-32px)] lg:min-h-[50%] w-full rounded-xl  bg-[#f5f6fc] text-textPrimary">
      {!isPromptLoading ? (
        <form onSubmit={handleSubmit} className="h-full">
          <textarea
            name="text"
            className="pr-2 bg-inherit w-full h-full resize-none outline-none"
            value={inputText}
            spellCheck={false}
            placeholder="Rewrite your text by entering or pasting it here and clicking 'Paraphrase'"
            onChange={(e) => setInputText(e?.target?.value)}
          />

          <button
            type="submit"
            className={`w-[140px] h-10 ml-auto mr-1.5 px-4 py-2 font-medium rounded-full flex justify-center items-center select-none bg-lightPink text-textPink  ${
              inputText && activeTabs?.length > 0 && !isLoading
                ? 'cursor-pointer transition-all  duration-[150] ease-in  delay-0 opacity-100   hover:shadow-outline-pink'
                : 'opacity-50'
            } `}
            disabled={!inputText || activeTabs?.length === 0 || isLoading}
          >
            {!isLoading ? (
              <div className="flex items-center gap-2 ">
                <p>Paraphrase</p>
                <PaperAirplaneIcon className="w-5 h-5 " />
              </div>
            ) : (
              <Spinner className="!w-6 !h-6" />
            )}
          </button>
        </form>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default InputTextArea
