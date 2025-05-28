import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '@/components/layout/root-layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Products, loader } = await import('@/routes/products')
          return { Component: Products, loader }
        },
      },
      {
        path: 'products',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'products/:id',
        lazy: async () => {
          const { ErrorBoundary, ProductDetail, loader } = await import(
            '@/routes/product-detail'
          )
          return {
            ErrorBoundary,
            Component: ProductDetail,
            loader: ({ params }) =>
              loader({ params: { id: params.id as string } }),
          }
        },
      },
      {
        path: 'cart',
        lazy: async () => {
          const { Cart, loader } = await import('@/routes/cart')
          return { Component: Cart, loader }
        },
      },
      {
        path: 'login',
        lazy: async () => {
          const { Login, action } = await import('@/routes/login')
          return { Component: Login, action }
        },
      },
      {
        path: 'register',
        lazy: async () => {
          const { Register, action } = await import('@/routes/register')
          return { Component: Register, action }
        },
      },
    ],
  },
])

export default router
