import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  isActive?: boolean
}

export default function Button({
  children,
  className,
  variant,
  isActive,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer px-4 py-2 font-medium transition-colors focus:ring-2 focus:ring-blue-200 focus:outline-none',
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
        className,
      )}
    >
      {children}
    </button>
  )
}
