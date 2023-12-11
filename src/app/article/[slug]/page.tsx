import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils'
import CodeBlock from '@/components/CodeBlock'

const components = {
  h2: (props: any) => (
    <h2 {...props} className="text-red-500">
      {props.children}
    </h2>
  ),
  pre: (props: any) => {
    const codeblock = (props.children.props.children as string).trim()

    return <CodeBlock codeBlock={codeblock} />
  },
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
