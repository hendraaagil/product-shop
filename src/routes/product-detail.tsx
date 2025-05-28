import { useState } from 'react'
import {
  useLoaderData,
  Link,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react'

import type { Product } from '@/types'
import { getProductById } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { useCartStore } from '@/stores/cart-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'

export function ErrorBoundary() {
  const error = useRouteError() as { status?: number; message?: string }

  return (
    <div className="py-12 text-center">
      <div className="mx-auto max-w-md">
        <div className="text-6xl">😢</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {error?.status === 404 ? 'Product Not Found' : 'Something went wrong'}
        </h1>
        <p className="mt-2 text-gray-600">
          {error?.status === 404
            ? "Sorry, we couldn't find the product you're looking for."
            : 'An unexpected error occurred.'}
        </p>
        <Link to="/">
          <Button variant="primary" className="mt-4 w-full">
            <ArrowLeft className="mr-2 size-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  )
}

export async function loader({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) {
    throw new Response('Product Not Found', { status: 404 })
  }
  return { product }
}

export function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const { product } = useLoaderData() as { product: Product }
  const { addItem, getItemQuantity } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const cartQuantity = getItemQuantity(product.id)
  const totalQuantity = cartQuantity + quantity

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate(`/login?from=${encodeURIComponent(`/products/${product.id}`)}`)
      return
    }

    addItem(product, quantity)
    setQuantity(1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden border-2 border-gray-300 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Rating rating={product.rating} />
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant={product.stock > 0 ? 'success' : 'danger'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Badge>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-sm text-orange-600">
                Only {product.stock} left!
              </span>
            )}
          </div>

          {product.stock > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {isAuthenticated ? (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                            title="Decrease quantity"
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="min-w-[3rem] px-4 py-2 text-center text-lg font-medium">
                            {quantity}
                          </span>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={increaseQuantity}
                            disabled={totalQuantity >= product.stock}
                            title="Increase quantity"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-lg font-semibold">
                        Total: {formatPrice(product.price * quantity)}
                      </div>
                    </>
                  ) : (
                    <div className="py-4 text-center">
                      <p className="text-gray-600">
                        Please sign in to add items to your cart
                      </p>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={totalQuantity > product.stock}
                  >
                    <ShoppingCart className="mr-2 size-5" />
                    {isAuthenticated ? 'Add to Cart' : 'Sign In to Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Link to="/">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 size-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
