import dayjs from 'dayjs'
import Link from 'next/link'
import { getRandomTimestamp } from '@/utils'

interface IProps {
  title: String
}

export default function ArticleLayout(props: IProps) {
  return (
    <>
      {props.title && <h2 className="my-4 text-3xl">{props.title}</h2>}

      <ul className="list-none">
        {Array.from({ length: 5 }, () => ({ title: 'Vue学习', timeStamp: getRandomTimestamp() }))
          .sort((a, b) => b.timeStamp - a.timeStamp)
          .map((item, index) => (
            <li key={item.title} className="my-4">
              <Link href="/detail">
                <h3 className="text-blue-500 dark:text-blue-300 no-underline hover:underline">
                  {item.title}
                  {index + 1}
                </h3>
              </Link>
              <small>
                <time dateTime={`${item.timeStamp}`}>{dayjs(item.timeStamp).format('YYYY-MM-DD HH:mm')}</time>
              </small>
            </li>
          ))}
      </ul>
    </>
  )
}
