import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeartIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="animate-bounce">
            <HeartIcon className="h-16 w-16 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-pink-800 sm:text-6xl">
            Happy International Women's Day!
          </h1>
          <p className="max-w-md text-lg text-pink-700">
            A special celebration for all the amazing women at BSS Commerce
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
              <Link href="/login">Sign in to get your special wish</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

