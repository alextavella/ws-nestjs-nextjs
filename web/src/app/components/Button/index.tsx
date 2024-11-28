import { cn } from '@/utils/cn'
import React from 'react'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  even: boolean
  selected?: boolean
}

const playOneStyle = 'hover:bg-blue-400'
const playOneSelectedStyle = 'bg-blue-500'

const playTwoStyle = 'hover:bg-blue-400'
const playTwoSelectedStyle = 'bg-blue-500'

function Button({
  children,
  className,
  even,
  selected = false,
  ...rest
}: Props) {
  const baseStyle = even ? playOneStyle : playTwoStyle

  const selectedStyle = selected
    ? even
      ? playOneSelectedStyle
      : playTwoSelectedStyle
    : undefined

  return (
    <button
      type="button"
      className={cn(
        'w-[100px] h-[100px] flex items-center justify-center',
        baseStyle,
        selectedStyle,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
