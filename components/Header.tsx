/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import HistoryDrawer from './HistoryDrawer'
import SavedDrawer from './SavedDrawer'

const Header = () => {
  const { data: session } = useSession()
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false)

  useEffect(() => {
    if (isHistoryDrawerOpen || isSavedDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isHistoryDrawerOpen, isSavedDrawerOpen])

  return (
    <div className="p-6">
      <div className="mx-auto flex items-center justify-between w-full max-w-[1600px]">
        <Link href="/" className="flex items-center gap-2 cursor-pointer ">
          <div className="relative w-8 h-8">
            <Image src="/assets/logo/strawberry-filled.svg" alt="Logo" fill />
          </div>
          <h1 className="text-textPink text-lg font-medium">Strawberry.ai</h1>
        </Link>

        {!session?.user?.email ? (
          <button className="login-button" onClick={() => signIn('google')}>
            Login
          </button>
        ) : (
          <div className="flex items-center gap-11">
            <>
              <button
                className="text-textPink font-medium cursor-pointer"
                onClick={() => setIsSavedDrawerOpen(true)}
              >
                Saved
              </button>
              <button
                className="text-textPink font-medium cursor-pointer"
                onClick={() => setIsHistoryDrawerOpen(true)}
              >
                History
              </button>

              {session?.user?.image ? (
                <Image
                  src={String(session?.user?.image)}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                  role="presentation"
                  priority
                  onClick={() => signOut()}
                />
              ) : null}

              <HistoryDrawer
                isHistoryDrawerOpen={isHistoryDrawerOpen}
                setIsHistoryDrawerOpen={setIsHistoryDrawerOpen}
              />
              <SavedDrawer
                isSavedDrawerOpen={isSavedDrawerOpen}
                setIsSavedDrawerOpen={setIsSavedDrawerOpen}
              />
            </>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
