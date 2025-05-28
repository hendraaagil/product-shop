type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className="mb-1 block text-sm font-medium text-gray-700">
      {children}
    </label>
  )
}
