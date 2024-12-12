'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { DocumentData, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useToolbarTabsContext } from '@/context/ToolbarContextProvider'
import { db } from '@/firebase'

import Skeleton from '../Fallback/Skeleton'
import Spinner from '../Fallback/Spinner'

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

  const model = 'gpt-4o-mini'
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

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        prompt: combinedInputText,
        model,
        session,
      },
    }

    try {
      const res = await axios('/api/askQuestion', options)
      const data = res?.data

      const prompt: Prompt = {
        input: trimmedInput,
        output:
          data?.choices?.[0]?.message?.content || 'Strawberry.ai was unable to rephrase your text!',
        createdAt: serverTimestamp(),
        tags: activeTabNames,
        isSaved: false,
      }

      if (
        session?.user?.email &&
        prompt?.output !== 'Strawberry.ai was unable to rephrase your text!'
      ) {
        await addPrompt(prompt)
      }

      setOutputText(prompt?.output)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="h-auto min-h-[calc(50%-32px)] w-full  rounded-xl bg-[#f5f6fc] p-4 pb-[60px]  text-textPrimary lg:min-h-[50%]">
      {!isPromptLoading ? (
        <form onSubmit={handleSubmit} className="h-full">
          <textarea
            name="text"
            className="h-full w-full resize-none bg-inherit pr-2 outline-none"
            value={inputText}
            spellCheck={false}
            placeholder="Rewrite your text by entering or pasting it here and clicking 'Paraphrase'"
            onChange={(e) => setInputText(e?.target?.value)}
          />

          <button
            type="submit"
            className={`ml-auto mr-1.5 flex h-10 w-[140px] select-none items-center justify-center rounded-full bg-lightPink px-4 py-2 font-medium text-textPink  ${
              inputText && activeTabs?.length > 0 && !isLoading
                ? 'hover:shadow-outline-pink cursor-pointer  opacity-100 transition-all  delay-0 duration-[150]   ease-in'
                : 'opacity-50'
            } `}
            disabled={!inputText || activeTabs?.length === 0 || isLoading}
          >
            {!isLoading ? (
              <div className="flex items-center gap-2 ">
                <p>Paraphrase</p>
                <PaperAirplaneIcon className="h-5 w-5 " />
              </div>
            ) : (
              <Spinner className="!h-6 !w-6" />
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
