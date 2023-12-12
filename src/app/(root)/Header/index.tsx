'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import MenuToggleButton from './components/MenuToggleButton'
import ThemeToggleButton from './components/ThemeToggleButton'
import { headerNavLinks } from '../data/headerNavLinks'

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
      <header className="fixed left-0 right-0 max-w-5xl mx-auto py-10 px-4 bg-inherit z-[999999]">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image priority className="rounded-full" src="/avatar.jpg" width={48} height={48} alt="头像"></Image>
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">zwh</div>
          </div>

          <nav className="hidden ml-auto text-base font-medium sm:block">
            {headerNavLinks.map(link => (
              <Link key={link.href} className="p-1 text-gray-900 dark:text-gray-100 sm:p-4" href={link.href}>
                {link.title}
              </Link>
            ))}
          </nav>

          {display && (
            <div className="fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 translate-x-0">
              <div className="py-10 px-4 text-white flex justify-end">
                <MenuToggleButton display={false} toggleMenuShow={() => toggleMenuShow(false)} />
              </div>
              <nav className="flex flex-col items-start px-8 text-2xl font-bold">
                {headerNavLinks.map(link => (
                  <Link
                    key={link.href}
                    className="p-4 text-gray-900 dark:text-gray-100"
                    href={link.href}
                    onClick={() => toggleMenuShow(false)}
                  >
                    {link.title}
                  </Link>
                ))}
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
