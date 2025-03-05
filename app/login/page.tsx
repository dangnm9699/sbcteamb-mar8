import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">Sign In</h1>
          <p className="text-pink-600 mt-2">Please sign in with your BSS Commerce account to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

