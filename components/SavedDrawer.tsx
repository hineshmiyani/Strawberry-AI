'use client'

import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  isSavedDrawerOpen: boolean
  setIsSavedDrawerOpen: Dispatch<SetStateAction<boolean>>
}

const SavedDrawer = ({ isSavedDrawerOpen, setIsSavedDrawerOpen }: Props) => {
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
            'w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (isSavedDrawerOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <div className="p-4 flex items-center justify-between">
              <h1 className="font-bold text-xl">History</h1>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-2  inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="p-4 flex flex-col gap-4">
              <p>qqqq</p>
              <p>qqqq</p>
              <p>qqqq</p>
              <p>qqqq</p>
            </div>
          </article>
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
