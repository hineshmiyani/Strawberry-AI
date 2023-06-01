'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Dropdown } from 'flowbite-react'
import StarIcon from '../Icons/StarIcon'
import LogOutIcon from '../Icons/LogOutIcon'
import HistoryIcon from '../Icons/HistoryIcon'
import HistoryDrawer from '../Drawers/HistoryDrawer'
import SavedDrawer from '../Drawers/SavedDrawer'
import { useToolbarTabsContext } from '@/context/ToolbarContextProvider'

const Header = () => {
  const { data: session } = useSession()
  const { setTabs } = useToolbarTabsContext()
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false)

  useEffect(() => {
    if (isHistoryDrawerOpen || isSavedDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isHistoryDrawerOpen, isSavedDrawerOpen])

  const ProfileMenu = () => {
    return (
      <>
        {session?.user?.image ? (
          <Image
            src={String(session?.user?.image)}
            alt=""
            width={32}
            height={32}
            className="cursor-pointer rounded-full"
            role="presentation"
            priority
          />
        ) : session?.user?.name ? (
          <button className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-lightPink">
            <span className="text-lg font-medium text-textPink">
              {session?.user?.name?.slice(0, 1)?.toUpperCase()}
            </span>
          </button>
        ) : null}
      </>
    )
  }

  const handleClick = () => {
    setTabs((currentTabs) => {
      const updatedTabs = currentTabs?.map((tab) => {
        if (tab?.name === 'fix grammar') {
          return { ...tab, active: true }
        }
        return { ...tab, active: false }
      })
      return updatedTabs
    })
  }

  return (
    <div className="px-4 py-6 md:px-6">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <Link href="/" className="flex cursor-pointer items-center gap-2" onClick={handleClick}>
          <div className="relative h-8 w-8">
            <Image src="/assets/logo/strawberry-filled.svg" alt="Logo" fill />
          </div>
          <div>
            <h1 className="text-lg font-medium leading-5 text-textPink">Strawberry.ai</h1>
            <h6 className="text-[10px]  font-medium text-textPink opacity-90">Paraphrasing Tool</h6>
          </div>
        </Link>

        {!session?.user?.email ? (
          <button className="login-button" onClick={() => signIn('google')}>
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-11">
            <>
              <button
                className="hidden cursor-pointer font-medium text-textPink sm:block"
                onClick={() => setIsSavedDrawerOpen(true)}
              >
                Saved
              </button>
              <button
                className="hidden cursor-pointer font-medium text-textPink sm:block"
                onClick={() => setIsHistoryDrawerOpen(true)}
              >
                History
              </button>

              <div className="custom-dropdown-ctn">
                <Dropdown
                  label={<ProfileMenu />}
                  arrowIcon={false}
                  trigger={'hover' || 'click'}
                  dismissOnClick
                >
                  {session?.user?.name || session?.user?.email ? (
                    <Dropdown.Header>
                      <div className="flex items-center gap-2">
                        <ProfileMenu />
                        <div>
                          <span className="block text-sm">{session?.user?.name || ''}</span>
                          <span className="block truncate text-sm font-medium">
                            {session?.user?.email || ''}
                          </span>
                        </div>
                      </div>
                    </Dropdown.Header>
                  ) : null}

                  <Dropdown.Item
                    icon={HistoryIcon as unknown as React.FC<React.SVGProps<SVGSVGElement>>}
                    onClick={() => setIsHistoryDrawerOpen(true)}
                  >
                    History
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={StarIcon as unknown as React.FC<React.SVGProps<SVGSVGElement>>}
                    onClick={() => setIsSavedDrawerOpen(true)}
                  >
                    Saved
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    icon={LogOutIcon as unknown as React.FC<React.SVGProps<SVGSVGElement>>}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>

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
