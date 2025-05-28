import { useState } from 'react'
import {
  Link,
  useLocation,
  Form,
  useActionData,
  useNavigation,
  redirect,
} from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TogglePassword } from '@/components/ui/toggle-password'
import AuthContainer from '@/components/layout/auth-container'

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirectTo') as string

  try {
    const success = await useAuthStore.getState().login(email, password)
    if (success) {
      return redirect(redirectTo || '/')
    } else {
      return { error: 'Invalid email or password' }
    }
  } catch {
    return { error: 'An error occurred. Please try again.' }
  }
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()
  const actionData = useActionData() as { error?: string } | undefined
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const from = searchParams.get('from') || location.state?.from?.pathname || '/'
  const isSubmitting = navigation.state === 'submitting'

  return (
    <AuthContainer
      title="Sign in to your account"
      description="Welcome back! Please sign in to continue shopping."
    >
      <>
        <Card>
          <CardContent className="p-6">
            <Form method="post" className="space-y-4">
              <input type="hidden" name="redirectTo" value={from} />

              {actionData?.error && (
                <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {actionData.error}
                </div>
              )}

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="demo@example.com"
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
                    placeholder="Enter your password"
                    defaultValue="password"
                    className="w-full"
                    required
                  />
                  <TogglePassword
                    onToggle={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create one here
            </Link>
          </p>
        </div>
      </>
    </AuthContainer>
  )
}
