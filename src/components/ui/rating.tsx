import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type RatingProps = {
  rating: number
  maxRating?: number
  className?: string
}

export function Rating({ rating, maxRating = 5, className }: RatingProps) {
  const roundedRating = Math.floor(rating)

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            {
              'fill-yellow-400 text-yellow-400': i < roundedRating,
              'text-gray-300': i >= roundedRating,
            },
            className,
          )}
        />
      ))}
    </div>
  )
}
