import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import dayjs from 'dayjs'
import { POSTS_PATH } from '@/utils/mdxUtils'
import CodeBlock from '@/components/CodeBlock'
import Icon from '@/components/Icon'

const components = {
  h2: (props: any) => {
    const url = decodeURIComponent(props.children)

    return (
      <h2
        id={`${url}`}
        {...props}
        className="mt-12 mb-4 pt-6 text-2xl tracking-tight border-t border-gray-200 dark:border-gray-800 transition-colors"
      >
        <a href={`#${url}`}>
          <span className="mr-4 text-green-600 dark:text-green-300">#</span>
          {props.children}
        </a>
      </h2>
    )
  },
  h3: (props: any) => {
    const url = decodeURIComponent(props.children)

    return (
      <h3
        id={`${url}`}
        {...props}
        className="mt-8 mb-2 pt-4 text-xl tracking-tight border-t border-gray-200 dark:border-gray-800 transition-colors"
      >
        <a href={`#${url}`}>
          <span className="mr-4 text-green-600 dark:text-green-300">##</span>
          {props.children}
        </a>
      </h3>
    )
  },
  pre: (props: any) => {
    const codeblock = (props.children.props.children as string).trim()

    return <CodeBlock codeBlock={codeblock} />
  },
  p: (props: any) => (
    <p {...props} className="my-4 leading-7">
      {props.children}
    </p>
  ),
  code: (props: any) => (
    <code
      {...props}
      className="mx-2 py-1 px-2 text-[#476582] bg-[#f6f6f7] dark:text-[#c9def1] dark:bg-[#313136] rounded-md transition-colors"
    >
      {props.children}
    </code>
  ),
  ul: (props: any) => (
    <ul {...props} className="my-4 pl-5 list-decimal">
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol {...props} className="my-4 pl-5 list-disc">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="text-xl [&>ul]:my-1 [&>ol]:my-1">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <a {...props} className="px-2 text-green-600 dark:text-green-300" target="_blank">
      <span className="pr-2">{props.children}</span>
      <Icon name="link" className="inline-block w-4 h-4" />
    </a>
  ),
}

const PageCategoryWrapper = ({ type }: { type: string }) => {
  return (
    <>
      <div className="relative pl-4 mb-8 text-base after:content-normal after:absolute after:inline-block after:left-0 after:w-[0.375rem] after:top-0 after:bottom-0 after:bg-[#10b981]">
        <span>前端</span>
        <span className="mx-[.2rem]">{'›'}</span>
        <span>{type}</span>
      </div>
    </>
  )
}

const PageMetaWrapper = ({ title, modificationTime }: { title: string; modificationTime: number }) => {
  return (
    <>
      <h2 className="mb-4 text-3xl font-semibold">{title}</h2>
      <div className="flex items-center content-start mr-4">
        <Icon name="calendar" className="w-4 h-4 m-1 mr-3" />
        <time dateTime={`${modificationTime}`}>{dayjs(modificationTime).format('YYYY-MM-DD HH:mm')}</time>
      </div>
    </>
  )
}

/**
 * @description: 获取md内容中的全部二级、三级标题
 * @param {string} fileContent
 */
function getTitles(fileContent: string) {
  // 使用正则表达式匹配二级和三级标题
  const headingPattern = /^(##\s+|###\s+)(.+)/gm
  const matches = []
  let match

  while ((match = headingPattern.exec(fileContent)) !== null) {
    // match[1] 匹配到的是标题的标识符（## 或 ###）
    // match[2] 匹配到的是标题的内容
    matches.push({
      level: match[1].trim(), // 提取标题级别
      content: match[2].trim(), // 提取标题内容
    })
  }

  return matches
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { source, modificationTime, metaData } = await getMdxData(slug)

  const titles = getTitles(source)

  return (
    <>
      <div className="relative flex">
        <aside className="hidden sm:block fixed pr-8 w-[224px]">
          <div className="pl-4 text-sm border border-transparent border-l-gray-200 dark:border-l-gray-800 transition-colors">
            <p className="text-sm tracking-wide font-semibold">overview</p>
            <nav>
              <span className="sr-only">title overview of this article</span>

              <ul>
                {titles.map(title => (
                  <li
                    key={title.content}
                    className={`${title.level === '###' && 'pl-4'} my-2 text-gray-600 dark:text-gray-500 break-words`}
                  >
                    <a href={`#${title.content}`}>{title.content}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <article className="pl-0 sm:pl-[224px] w-auto overflow-hidden">
          <PageCategoryWrapper type="基础" />
          <PageMetaWrapper title={metaData.title} modificationTime={modificationTime} />
          <MDXRemote source={source} components={components} />
        </article>
      </div>
    </>
  )
}

/**
 * @description: 获取mdx的meta信息
 */
async function getMdxData(filename: string) {
  const decodeFilename = decodeURIComponent(filename)

  const fullPath = path.join(POSTS_PATH, `${decodeFilename}.mdx`)
  const fileStats = fs.statSync(fullPath)
  const modificationTime = new Date(fileStats.mtime).getTime() // 修改时间

  const source = fs.readFileSync(fullPath)
  const { content, data } = matter(source)

  return {
    metaData: data,
    source: content,
    modificationTime,
  }
}
