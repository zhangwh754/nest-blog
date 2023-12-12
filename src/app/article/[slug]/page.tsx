import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils'
import CodeBlock from '@/components/CodeBlock'

const components = {
  h2: (props: any) => {
    const url = decodeURIComponent(props.children)

    return (
      <h2
        id={`${url}`}
        {...props}
        className="mt-12 mb-4 pt-6 text-2xl tracking-tight border-t border-gray-200 dark:border-gray-800 transition-colors"
      >
        <a href={`#${url}`} className="relative [&>span]:invisible [&>span]:hover:visible">
          <span className="absolute -left-8 text-green-600 dark:text-green-300">#</span>
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
        <a href={`#${url}`} className="relative [&>span]:invisible [&>span]:hover:visible">
          <span className="absolute -left-12 text-green-600 dark:text-green-300">##</span>
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
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { source } = await getMdxData(slug)

  return (
    <>
      <MDXRemote source={source} components={components} />
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
