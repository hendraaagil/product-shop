import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

import type { Product } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import { useCartStore } from '@/stores/cart-store'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()
  const navigate = useNavigate()

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    addItem(product)
  }

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group overflow-hidden">
        <div className="border-4 border-transparent transition-colors hover:border-gray-100">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <CardContent className="p-4">
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>

            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center space-x-1">
              <Rating rating={product.rating} />
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <Badge
                variant={product.stock > 0 ? 'success' : 'danger'}
                className="text-xs"
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : 'Out of stock'}
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              variant="primary"
            >
              <ShoppingCart className="mr-2 size-4" />
              {isAuthenticated ? 'Add to Cart' : 'Sign in to Add to Cart'}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
