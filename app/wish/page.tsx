import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { WishCard } from "@/components/wish-card"
import { FlippingBackground } from "@/components/flipping-background"

const ImageMap: Record<string, string> = {
  "thaonp1@bsscommerce.com": "",
  "ngacth@bsscommerce.com": "",
  "anhnlh@bsscommerce.com": "",
  "trath@bsscommerce.com": "",
  "yennh1@bsscommerce.com": "",
  "default": "/social.png?height=283&width=400",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FlippingBackground userImage={ImageMap[session.user.email || ""] || ImageMap["default"]} />
      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <WishCard user={session.user} />
      </div>
    </div>
  )
}

