import { useState } from 'react'
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  redirect,
} from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TogglePassword } from '@/components/ui/toggle-password'

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long' }
  }

  try {
    const success = await useAuthStore
      .getState()
      .register(email, password, name)
    if (success) {
      return redirect('/')
    } else {
      return { error: 'Email already exists. Please use a different email.' }
    }
  } catch {
    return { error: 'An error occurred. Please try again.' }
  }
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigation = useNavigation()
  const actionData = useActionData() as { error?: string } | undefined
  const isSubmitting = navigation.state === 'submitting'

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100">
            <ShoppingCart className="size-6 text-blue-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and start shopping!
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form method="post" className="space-y-4">
              {actionData?.error && (
                <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {actionData.error}
                </div>
              )}

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="w-full"
                    required
                  />
                  <TogglePassword
                    onToggle={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="w-full"
                    required
                  />
                  <TogglePassword
                    onToggle={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    showPassword={showConfirmPassword}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
