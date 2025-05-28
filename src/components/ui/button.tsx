import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isActive?: boolean
}

export default function Button({
  children,
  className,
  variant,
  size = 'md',
  isActive,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer font-medium transition-colors focus:ring-2 focus:ring-blue-200 focus:outline-none',
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300':
            variant === 'secondary',
          'border border-red-200 bg-red-500 text-white hover:bg-red-600':
            variant === 'danger',
          'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
            variant === 'ghost',
          'bg-white text-gray-900 hover:bg-white':
            variant === 'ghost' && isActive,
        },
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'h-10 w-10 p-2': size === 'icon',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}
