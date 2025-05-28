import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'

import { useAuthStore } from '@/stores/auth-store'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const { user, isAuthenticated, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCartClick = () => {
    if (!isAuthenticated) {
      return navigate('/login?from=/cart')
    }
    navigate('/cart')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Shop</span>
          </Link>

          <div className="hidden items-center space-x-4 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative"
              title="Cart"
            >
              <ShoppingCart className="size-5" />
              {isAuthenticated && getTotalItems() > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full p-0 text-xs"
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  Hello, <span className="font-medium">{user?.name}</span>
                </p>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="size-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" title="Login">
                  <User className="size-5" />
                </Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Menu"
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white py-4 md:hidden">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  handleCartClick()
                  setIsMenuOpen(false)
                }}
              >
                <ShoppingCart className="mr-2 size-5" />
                Cart {isAuthenticated && `(${getTotalItems()})`}
              </Button>

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-gray-600">
                      Hello, <span className="font-medium">{user?.name}</span>
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 size-5" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 size-5" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
