import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartState, Product } from '@/types'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get()
        const existingItem = items.find(
          (item) => item.product.id === product.id,
        )

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
        } else {
          set({
            items: [...items, { product, quantity }],
          })
        }
      },

      removeItem: (productId: string) => {
        const { items } = get()
        set({
          items: items.filter((item) => item.product.id !== productId),
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({
            items: items.filter((item) => item.product.id !== productId),
          })
        } else {
          set({
            items: items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
          })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        )
      },
    }),
    { name: 'cart-storage' },
  ),
)
