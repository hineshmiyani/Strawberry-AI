import React from 'react'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import Head from './head'
import './globals.css'
import Header from '@/components/Header'
import ClientProvider from '@/components/Providers/ClientProvider'
import SessionProvider from '@/components/Providers/SessionProvider'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={inter.className}>
      <Head />
      <body>
        <SessionProvider session={session}>
          <ClientProvider>
            <div className="fixed h-screen w-full overflow-hidden">
              <div className="bg-strawberry-gradient h-full min-h-screen w-screen overflow-x-hidden overflow-y-scroll">
                <Header />
                <div>{children}</div>
              </div>
            </div>
          </ClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
