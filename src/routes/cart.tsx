import { Link, redirect } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react'

import { formatPrice, pluralize } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function loader() {
  const { isAuthenticated } = useAuthStore.getState()

  if (!isAuthenticated) {
    throw redirect('/login?from=/cart')
  }

  return null
}

export function Cart() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore()

  const handleCheckout = () => {
    alert('Successfully checked out!')
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto max-w-md">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-4 w-full">
              <ShoppingCart className="mr-2 size-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600">
          {getTotalItems()} {pluralize(getTotalItems(), 'item')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Link to={`/products/${item.product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600">
                      {item.product.category}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      title="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="min-w-[3rem] px-3 py-1 text-center text-lg font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                      title="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  <Button
                    variant="danger"
                    size="icon"
                    onClick={() => removeItem(item.product.id)}
                    title="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-600">
                    {item.quantity} × {formatPrice(item.product.price)}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <Link to="/">
              <Button variant="secondary">
                <ArrowLeft className="mr-2 size-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button variant="danger" onClick={clearCart}>
              <Trash2 className="mr-2 size-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
