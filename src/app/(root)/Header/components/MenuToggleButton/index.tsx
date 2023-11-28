'use client'

import React from 'react'

interface IProps {
  display: Boolean
  toggleMenuShow: Function
}

export default function MenuToggleButton(props: IProps) {
  const toggleMenuShow = () => {
    props.toggleMenuShow()
  }

  return (
    <button
      className={`sm:hidden ml-1 sm:ml-4 p-1 rounded-md w-10 h-10 flex justify-center ${!props.display && 'mt-1'}`}
      onClick={() => toggleMenuShow()}
    >
      <span className="sr-only">Toggle Menu Show</span>
      {props.display ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </button>
  )
}
