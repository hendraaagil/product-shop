import { Eye, EyeOff } from 'lucide-react'

type TogglePasswordProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onToggle: () => void
  showPassword: boolean
}

export function TogglePassword({
  onToggle,
  showPassword,
  ...props
}: TogglePasswordProps) {
  return (
    <button
      type="button"
      className="absolute inset-y-0 right-0 cursor-pointer border-y border-r border-gray-300 px-2.5 transition-colors hover:bg-gray-50"
      onClick={onToggle}
      {...props}
    >
      {showPassword ? (
        <EyeOff className="size-4 text-gray-400" />
      ) : (
        <Eye className="size-4 text-gray-400" />
      )}
    </button>
  )
}
