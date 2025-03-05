"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/wish" })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-pink-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-pink-800">Welcome Back!</CardTitle>
        <CardDescription className="text-center text-pink-600">
          Sign in with your BSS Commerce Google account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full max-w-xs">
          <Button
            variant="outline"
            className="w-full border-pink-300 hover:bg-pink-50 hover:text-pink-800"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-xs text-pink-500 mt-2">Only BSS Commerce email addresses are allowed</p>
      </CardFooter>
    </Card>
  )
}

