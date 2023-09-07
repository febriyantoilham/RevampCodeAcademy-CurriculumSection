import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/redux-saga/provider'
import Navbar from '@/app/ui/navbar'
import Sidebar from '@/app/ui/sidebar'
import Footer from './ui/footer'
import { getCookie, hasCookie } from 'cookies-next'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body className='bg-gray-100'>
          <div className='flex flex-col gap-3 min-h-screen'>
            <div className='flex-none'>
              <Navbar/>
            </div>
            <div className='flex flex-1'>
              <div className='min-h-full flex-none'>
                <Sidebar/>
              </div>
              <div className='md:px-3 flex-1 min-h-full'>
                  {children}
              </div>
            </div>
            <div className='flex-none'>
              <Footer/>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  )
}
