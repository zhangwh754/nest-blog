import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils'

interface IProps {
  title: String
}

interface IArticleItem {
  data: {
    [key: string]: any
  }
  filePath: string
  modificationTime: number
}

interface IIconProps {
  type: 'type' | 'date'
  className: string
}

/**
 * @description: 文章列表
 * @param {IProps} props
 */
export default async function ArticleLayout(props: IProps) {
  // console.log('getMdxData', getMdxData())
  const list = getMdxData()

  return (
    <>
      {props.title && <h2 className="my-4 text-3xl">{props.title}</h2>}

      <ul className="list-none">
        {list.sort((a, b) => b.modificationTime - a.modificationTime).map(item => ArticleItem(item))}
      </ul>
    </>
  )
}

/**
 * @description: 单篇文章
 * @param {IArticleItem} item
 */
export const ArticleItem = (item: IArticleItem) => {
  return (
    <>
      <li key={item.filePath} className="mt-0 mb-8 pt-4">
        {/* <Link href={`/article/${item.filePath}`}>
          <h3 className="mb-3 text-blue-500 dark:text-blue-300 no-underline hover:underline">{item.data.title}</h3>
        </Link> */}
        <Link as={`/article/${item.filePath.replace(/\.mdx?$/, '')}`} href={`/article/[slug]`}>
          <h3 className="mb-3 text-blue-500 dark:text-blue-300 no-underline hover:underline">{item.data.title}</h3>
        </Link>
        <div className="flex items-center justify-start flex-wrap mb-2">
          <div className="flex items-center content-start mr-4">
            <Icon type="type" className="w-4 h-4 m-1" />
            <span>前端</span>
            {['工具'].map(category => (
              <>
                <span> / </span>
                <span>{category}</span>
              </>
            ))}
          </div>
          <div className="flex items-center content-start mr-4">
            <Icon type="date" className="w-4 h-4 m-1" />
            <time dateTime={`${item.modificationTime}`}>{dayjs(item.modificationTime).format('YYYY-MM-DD HH:mm')}</time>
          </div>
        </div>
        {item.data.description && <p className="line-clamp-3">{item.data.description}</p>}
      </li>
    </>
  )
}

/**
 * @description: 图标
 * @param {IIconProps} props
 */
export const Icon = (props: IIconProps) => {
  switch (props.type) {
    case 'type':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={props.className}>
          <g fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            ></path>
          </g>
        </svg>
      )
    case 'date':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className}>
          <path
            fill="currentColor"
            d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
          ></path>
        </svg>
      )
    default:
      break
  }
}

/**
 * @description: 获取mdx的meta信息
 */
export function getMdxData() {
  const posts = postFilePaths.map(filePath => {
    const fullPath = path.join(POSTS_PATH, filePath)
    const fileStats = fs.statSync(fullPath)
    const modificationTime = new Date(fileStats.mtime).getTime() // 修改时间

    const source = fs.readFileSync(fullPath)
    const { data } = matter(source)
    return {
      data,
      filePath,
      modificationTime,
    }
  })
  return posts
}
