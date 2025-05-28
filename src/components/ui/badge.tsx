import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'success' | 'danger'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-blue-100 text-blue-800': variant === 'secondary',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-red-100 text-red-800': variant === 'danger',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
