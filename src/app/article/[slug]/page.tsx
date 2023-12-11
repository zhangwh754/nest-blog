import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils'
import { Suspense } from 'react'

export const components = {
  h2: (props: any) => (
    <h2 {...props} className="text-red-500">
      {props.children}
    </h2>
  ),
  pre: (props: any) => (
    <div className="relative bg-[#292b30] rounded-md [&>button]:invisible [&>button]:hover:visible">
      <button className="absolute right-4 top-4">
        <svg className="inline-block text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <pre {...props} className="py-5 px-6 text-sm leading-5">
        {props.children}
      </pre>
    </div>
  ),
  p: (props: any) => (
    <p {...props} className="my-4 leading-7">
      {props.children}
    </p>
  ),
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { source } = await getMdxData(slug)

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <MDXRemote source={source} components={components} />
    </>
  )
}

/**
 * @description: 获取mdx的meta信息
 */
export async function getMdxData(filePath: string) {
  const fullPath = path.join(POSTS_PATH, `${filePath}.mdx`)
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
