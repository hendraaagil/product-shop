import { cn } from '@/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('border border-gray-100 bg-white', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3
      className={cn(
        'text-lg leading-none font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={cn('text-sm text-gray-500', className)}>{children}</p>
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  )
}
