'use client'

import React, { useEffect } from 'react'

interface IProps {
  titles: {
    level: string
    content: string
  }[]
}

function scroll(sections: NodeListOf<Element>, navLinks: NodeListOf<Element>) {
  // 获取滚动位置
  const scrollPosition = window.scrollY

  // 遍历所有区块
  sections.forEach((section, index) => {
    const offsetTop = (section as HTMLElement).offsetTop
    const offsetBottom = offsetTop + (section as HTMLElement).offsetHeight

    // 判断当前滚动位置是否在当前区块范围内
    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
      // 移除所有导航栏的高亮状态
      navLinks.forEach(link => link.classList.remove('active-link'))

      // 添加当前导航栏的高亮状态
      navLinks[index].classList.add('active-link')
    }
  })
}

export default function ArticleAside(props: IProps) {
  useEffect(() => {
    const sections = document.querySelectorAll('.article-title')
    const navLinks = document.querySelectorAll('.nav-link a')

    window.addEventListener('scroll', () => scroll(sections, navLinks))
  }, [])

  return (
    <aside className="hidden sm:block fixed pr-8 w-[224px]">
      <div className="pl-4 text-sm border border-transparent border-l-gray-200 dark:border-l-gray-800 transition-colors">
        <p className="text-sm tracking-wide font-semibold">overview</p>
        <nav>
          <span className="sr-only">title overview of this article</span>

          <ul>
            {props.titles.map(title => (
              <li
                key={title.content}
                className={`nav-link ${
                  title.level === '###' ? 'pl-4' : ''
                } my-2 text-gray-600 dark:text-gray-500 break-words [&>.active-link]:text-green-600 [&>.active-link]:dark:text-green-300`}
              >
                <a href={`#${title.content}`}>{title.content}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
