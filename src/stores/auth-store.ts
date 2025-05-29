import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthState, User } from '@/types'

const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === 'demo@example.com' && password === 'password') {
          const user = mockUsers.find((u) => u.email === email)
          if (user) {
            set({ user, isAuthenticated: true })
            return true
          }
        }

        if (password === 'password') {
          const user = mockUsers.find((u) => u.email === email)
          if (user) {
            set({ user, isAuthenticated: true })
            return true
          }
        }

        return false
      },

      register: async (email: string, _password: string, name: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const existingUser = mockUsers.find((u) => u.email === email)
        if (existingUser) {
          return false
        }

        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
        }

        mockUsers.push(user)
        set({ user, isAuthenticated: true })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    { name: 'auth-storage' },
  ),
)
