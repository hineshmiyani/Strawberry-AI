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

  const [prompts, loading, error] = useCollection(
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

  console.log('Prompts', { prompts, loading, error })

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
        className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform  ease-in-out
         ${
           isSavedDrawerOpen
             ? 'transition-opacity opacity-100 translate-x-0 duration-500'
             : 'translate-x-full delay-500 opacity-0'
         }`}
      >
        <section
          className={
            'w-screen max-w-lg right-0 absolute bg-strawberry-gradient h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (isSavedDrawerOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <div className="p-4 relative w-screen max-w-lg pb-10 flex flex-col gap-4 overflow-y-hidden h-full ">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl text-textDarkBlue opacity-90">Saved</h1>
              <button
                type="button"
                className="text-textPink bg-transparent hover:bg-lightPink  rounded-full text-sm p-2  inline-flex items-center "
                onClick={() => setIsSavedDrawerOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
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
            <div className="p-2 w-full h-full overflow-y-hidden bg-white rounded-lg z-1 border border-solid border-[#d2d9ee] transition-colors  duration-1000 ease-in-out">
              <div
                ref={promptCtnRef}
                className="pr-2 flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden"
              >
                {!prompts?.empty ? (
                  prompts?.docs?.map((prompt) => (
                    <div
                      key={prompt?.id}
                      className="p-2.5 text-sm flex gap-3 justify-between rounded-lg z-1  cursor-pointer select-none duration-[400ms] ease-in-out transition-all hover:bg-slate-50 hover:drop-shadow-sm"
                      role="presentation"
                      onClick={() => {
                        router.push(`/?id=${prompt?.id}`)
                        setIsSavedDrawerOpen(false)
                      }}
                    >
                      <div className="space-y-1.5 ">
                        <p className="line-clamp-2">{prompt?.data()?.input}</p>
                        <p className="line-clamp-2 opacity-70">
                          {prompt?.data()?.output?.replace(/.*\n\n/g, '')}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center gap-2.5">
                        <button
                          type="button"
                          className="bg-transparent hover:bg-lightPink rounded-full text-sm p-1.5  inline-flex items-center "
                          onClick={(e) => handleSavePrompt(e, prompt?.id, prompt?.data()?.isSaved)}
                        >
                          {prompt?.data()?.isSaved ? (
                            <StarIconFilled className="w-5 h-5 text-textPink" />
                          ) : (
                            <StarIcon className="w-5 h-5 text-textPink" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="bg-transparent hover:bg-lightPink rounded-full text-sm p-1.5  inline-flex items-center "
                          onClick={(e) => handleDeletePrompt(e, prompt?.id)}
                        >
                          <TrashIcon className="w-5 h-5  text-textPink" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
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
          className=" w-screen h-full cursor-pointer "
          onClick={() => setIsSavedDrawerOpen(false)}
        ></section>
      </main>
    </>
  )
}

export default SavedDrawer
