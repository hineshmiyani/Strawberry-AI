import React from 'react'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import Head from './head'
import './globals.css'
import Header from '@/components/Header'
import SessionProvider from '@/components/SessionProvider'
import ClientProvider from '@/components/ClientProvider'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={inter.className}>
      <Head />
      <body>
        <SessionProvider session={session}>
          <ClientProvider>
            <div className="h-full min-h-screen bg-strawberry-gradient">
              <Header />
              <div>{children}</div>
            </div>
          </ClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
