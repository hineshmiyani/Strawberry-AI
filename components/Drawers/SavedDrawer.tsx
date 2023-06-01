'use client'

import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/navigation'
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconFilled } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { db } from '@/firebase'

type Props = {
  isSavedDrawerOpen: boolean
  setIsSavedDrawerOpen: Dispatch<SetStateAction<boolean>>
}

const SavedDrawer = ({ isSavedDrawerOpen, setIsSavedDrawerOpen }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const promptCtnRef = useRef<HTMLDivElement>(null)

  const [prompts] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email || '', 'prompts'),
        where('isSaved', '==', true),
        orderBy('updatedAt', 'desc')
      )
  )

  useEffect(() => {
    if (promptCtnRef?.current) {
      promptCtnRef.current.scrollTop = 0
    }
  }, [isSavedDrawerOpen])

  const handleSavePrompt = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    promptId: string,
    isSaved: boolean
  ) => {
    e.stopPropagation()

    const promptRef = doc(db, 'users', session?.user?.email || '', 'prompts', promptId)

    // update isSaved field
    try {
      await updateDoc(promptRef, {
        isSaved: !isSaved,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeletePrompt = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    promptId: string
  ) => {
    e.stopPropagation()

    const promptRef = doc(db, 'users', session?.user?.email || '', 'prompts', promptId)

    // delete prompt
    try {
      await deleteDoc(promptRef)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <main
        className={`fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25  ease-in-out
         ${
           isSavedDrawerOpen
             ? 'translate-x-0 opacity-100 transition-opacity duration-500'
             : 'translate-x-full opacity-0 delay-500'
         }`}
      >
        <section
          className={
            'bg-strawberry-gradient delay-400 absolute right-0 h-full w-screen max-w-lg transform shadow-xl transition-all duration-500 ease-in-out  ' +
            (isSavedDrawerOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <div className="relative flex h-full w-screen max-w-lg flex-col gap-4 overflow-y-hidden p-4 pb-10 ">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-textDarkBlue opacity-90">Saved</h1>
              <button
                type="button"
                className="inline-flex items-center rounded-full  bg-transparent p-2 text-sm  text-textPink hover:bg-lightPink "
                onClick={() => setIsSavedDrawerOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="z-1 h-full w-full overflow-y-hidden rounded-lg border border-solid border-[#d2d9ee] bg-white p-2 transition-colors  duration-1000 ease-in-out">
              <div
                ref={promptCtnRef}
                className="flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2"
              >
                {!prompts?.empty ? (
                  prompts?.docs?.map((prompt) => (
                    <div
                      key={prompt?.id}
                      className="z-1 flex cursor-pointer select-none justify-between gap-3 rounded-lg  p-2.5 text-sm transition-all duration-[400ms] ease-in-out hover:bg-slate-50 hover:drop-shadow-sm"
                      role="presentation"
                      onClick={() => {
                        router.push(`/?id=${prompt?.id}`)
                        setIsSavedDrawerOpen(false)
                      }}
                    >
                      <div className="space-y-1.5 ">
                        <p className="line-clamp-2">{prompt?.data()?.input}</p>
                        <p className="line-clamp-2 opacity-70">{prompt?.data()?.output?.trim()}</p>
                      </div>

                      <div className="flex flex-col justify-center gap-2.5">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-transparent p-1.5  text-sm hover:bg-lightPink "
                          onClick={(e) => handleSavePrompt(e, prompt?.id, prompt?.data()?.isSaved)}
                        >
                          {prompt?.data()?.isSaved ? (
                            <StarIconFilled className="h-5 w-5 text-textPink" />
                          ) : (
                            <StarIcon className="h-5 w-5 text-textPink" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-transparent p-1.5  text-sm hover:bg-lightPink "
                          onClick={(e) => handleDeletePrompt(e, prompt?.id)}
                        >
                          <TrashIcon className="h-5 w-5  text-textPink" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <Image src="/assets/images/star-card.png" width={180} height={180} alt="" />
                      <p className="text-textDarkBlue opacity-80">
                        Tap the star icon to save important phrases.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          role="presentation"
          className=" h-full w-screen cursor-pointer "
          onClick={() => setIsSavedDrawerOpen(false)}
        ></section>
      </main>
    </>
  )
}

export default SavedDrawer
