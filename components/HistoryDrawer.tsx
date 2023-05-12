'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase'

type Props = {
  isHistoryDrawerOpen: boolean
  setIsHistoryDrawerOpen: Dispatch<SetStateAction<boolean>>
}

const HistoryDrawer = ({ isHistoryDrawerOpen, setIsHistoryDrawerOpen }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [prompts, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email || '', 'prompts'),
        orderBy('createdAt', 'desc')
      )
  )

  console.log({ prompts, loading, error })

  return (
    <>
      <main
        className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform  ease-in-out
         ${
           isHistoryDrawerOpen
             ? 'transition-opacity opacity-100 translate-x-0 duration-500'
             : 'translate-x-full delay-500 opacity-0'
         }`}
      >
        <section
          className={
            'w-screen max-w-lg right-0 absolute bg-strawberry-gradient h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (isHistoryDrawerOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <div className="py-5 pl-5 pr-2 relative w-screen max-w-lg pb-10 flex flex-col gap-6 overflow-y-hidden h-full">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">History</h1>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-white hover:text-gray-500 rounded-full text-sm p-2  inline-flex items-center "
                onClick={() => setIsHistoryDrawerOpen(false)}
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
            <div className="w-full h-full overflow-y-hidden">
              <div className="pr-2 flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden">
                {prompts?.docs?.map((prompt) => (
                  <div
                    key={prompt?.id}
                    className="p-1.5 text-sm gap-1 cursor-pointer select-none bg-white rounded-2xl z-1 border border-solid border-[#d2d9ee] transition-colors  duration-1000 ease-in-out"
                    role="presentation"
                    onClick={() => {
                      router.push(`/?id=${prompt?.id}`)
                      setIsHistoryDrawerOpen(false)
                    }}
                  >
                    <div className="p-2.5 hover:bg-[#f5f6fce2] rounded-xl">
                      <p className="line-clamp-2">{prompt?.data()?.input}</p>
                      <p className="line-clamp-2 opacity-60">
                        {prompt?.data()?.output?.replace(/.*\n\n/g, '')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          role="presentation"
          className=" w-screen h-full cursor-pointer "
          onClick={() => setIsHistoryDrawerOpen(false)}
        ></section>
      </main>
    </>
  )
}

export default HistoryDrawer
