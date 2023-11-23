'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      removeDark()
    } else {
      setDark()
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      removeDark()
    } else {
      setDark()
    }
  }

  const setDark = () => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    setTheme('dark')
  }

  const removeDark = () => {
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
    setTheme('light')
  }

  return (
    <div>
      <p>current theme：{theme}</p>
      <button
        className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        onClick={() => toggleTheme()}
      >
        toggleTheme
      </button>
    </div>
  )
}
