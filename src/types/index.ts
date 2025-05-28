export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  reviews: number
}

export type User = {
  id: string
  email: string
  name: string
}

export type CartItem = {
  product: Product
  quantity: number
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

export type CartState = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
