interface IProps {
  name: string
  className?: string
}

/**
 * @description: 图标
 * @param {IIconProps} props
 */
const Icon = ({ name, className = '' }: IProps) => {
  return (
    <>
      <svg className={`icon ${className}`} aria-hidden="true">
        <use xlinkHref={`#i-${name}`}></use>
      </svg>
    </>
  )
}

export default Icon
