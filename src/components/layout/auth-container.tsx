import { ShoppingCart } from 'lucide-react'

type AuthContainerProps = {
  title: string
  description: string
  children: React.ReactNode
}

export default function AuthContainer({
  title,
  description,
  children,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100">
            <ShoppingCart className="size-6 text-blue-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
