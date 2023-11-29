'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import MenuToggleButton from './components/MenuToggleButton'
import ThemeToggleButton from './components/ThemeToggleButton'

export default function Header() {
  const [display, setDisplay] = useState(false)

  const toggleMenuShow = (display: Boolean) => {
    if (display) {
      document.documentElement.classList.add('overflow-hidden')
      setDisplay(true)
    } else {
      document.documentElement.classList.remove('overflow-hidden')
      setDisplay(false)
    }
  }

  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image priority className="rounded-full" src="/avatar.jpg" width={48} height={48} alt="头像"></Image>
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">zwh</div>
          </div>

          <nav className="hidden ml-auto text-base font-medium sm:block">
            <Link className="p-1 text-gray-900 dark:text-gray-100 sm:p-4" href="/">
              Blog
            </Link>
            <Link className="p-1 text-gray-900 dark:text-gray-100 sm:p-4" href="/tag">
              Tags
            </Link>
            <Link className="p-1 text-gray-900 dark:text-gray-100 sm:p-4" href="/chat">
              Chat
            </Link>
            <Link className="p-1 text-gray-900 dark:text-gray-100 sm:p-4" href="/about">
              About
            </Link>
          </nav>

          {display && (
            <div className="fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 translate-x-0">
              <div className="py-10 px-4 text-white flex justify-end">
                <MenuToggleButton display={false} toggleMenuShow={() => toggleMenuShow(false)} />
              </div>
              <nav className="flex flex-col items-start px-8 text-2xl font-bold">
                <Link className="p-4 text-gray-900 dark:text-gray-100" href="/">
                  Blog
                </Link>
                <Link className="p-4 text-gray-900 dark:text-gray-100" href="/tag">
                  Tags
                </Link>
                <Link className="p-4 text-gray-900 dark:text-gray-100" href="/chat">
                  Chat
                </Link>
                <Link className="p-4 text-gray-900 dark:text-gray-100" href="/about">
                  About
                </Link>
              </nav>
            </div>
          )}

          <ThemeToggleButton />

          <MenuToggleButton display={true} toggleMenuShow={() => toggleMenuShow(true)} />
        </div>
      </header>
    </>
  )
}
