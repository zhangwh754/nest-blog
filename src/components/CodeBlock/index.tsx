'use client'

import React, { useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import Icon from '@/components/Icon'

interface IProps {
  codeBlock: string
}

export default function CodeBlock(props: IProps) {
  const [isCopy, setIsCopy] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(props.codeBlock)
    setIsCopy(true)

    setTimeout(() => {
      setIsCopy(false)
    }, 1500)
  }

  return (
    <Highlight code={props.codeBlock} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative py-3 bg-[#1e1e1e] rounded-md">
          <button className="absolute right-4 top-4" onClick={() => copyCode()}>
            {isCopy ? (
              <Icon className="w-5 h-5 text-green-500" name="success" />
            ) : (
              <Icon className="w-5 h-5 text-white" name="copy" />
            )}
          </button>
          <pre className="overflow-x-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <>
                  <span className="inline-block mr-4 w-8 text-center text-gray-500 select-none">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
