"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart } from "lucide-react"
import type { User } from "next-auth"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

const wishes = [
  `Nắng đã có mũ, mưa đã có ô</br>Cảm nắng vì có người con gái đáng yêu ở đây tại Team B cùng anh em chúng mình.</br>Cảm ơn cậu vì đã luôn cố gắng hết mình để trở thành phiên bản tốt nhất.</br>Hãy tin rằng, mọi sự cố gắng đều sẽ được đền đáp xứng đáng và đừng lo nhé vì đã có anh em Team B chống lưng đây rồi!`,
  `Chúc mừng ngày Quốc tế Phụ Nữ 08/03</br></br>Chúc bạn tay ôm đầy hoa, túi xách đầy quà, có tình đầy tim nhé!`,
  `Dù cho tận thế vẫn thấy cậu xinh - vẫn thấy cậu xinh</br></br>Chúc cậu một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`,
  `"Sống hết mình, sống trọn phút giây chân tình</br>Thanh xuân đang chờ, bình yên thật đẹp như mơ"</br></br>Chúc cậu - cô gái xinh đẹp đang đọc tấm thiệp này, một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`,
  `Thông điệp gửi đến cô gái mạnh mẽ và đáng yêu của anh em Team B:</br></br>" Love Yourself, Trust Yourself "</br></br>Hãy luôn tự tin rằng cậu có vẻ đẹp đặc biệt, vẻ đẹp ấy là độc nhất vô nhị và với anh em chúng mình cậu luôn tuyệt vời. Vậy nên hãy cười thật nhiều nhé!`,
  `Miệng cười xinh, mắt to, lung linh nhìn cậu cứ như thiên thần</br>Tại sao cậu lại đẹp đến như vậy?</br>---</br>Trái Đất thật đẹp khi có nàng thơ là cậu đó!</br>Chúc cậu một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`
]

interface WishCardProps {
  user: User | undefined
}

export function WishCard({ user }: WishCardProps) {
  const [wish, setWish] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#ec4899", "#db2777"],
    })
  }, [])

  const getRandomWish = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wishes.length)
      setWish(wishes[randomIndex])
      setIsAnimating(false)
      triggerConfetti()
    }, 500)
  }, [triggerConfetti])

  useEffect(() => {
    getRandomWish()
  }, [getRandomWish])

  return (
    <Card className="w-full max-w-lg border-pink-300 bg-white/90 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="relative">
            {user?.image && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-400">
                <img
                  src={"/social.png"}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-pink-500 rounded-full p-1">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
          </div>

          <div>
            <h2 className="text-xl text-pink-800 font-bold">
              Chúc mừng EM's DAY 08/03, {user?.name?.split(" ")[0] || "Friend"}!
            </h2>
            <div className="flex items-center mt-4 max-h-fit min-h-32">
              <p
                className={cn(
                  "text-lg text-pink-700 transition-all duration-500",
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100",
                )}
                dangerouslySetInnerHTML={{ __html: wish }}
              />
            </div>
          </div>

          <Button onClick={getRandomWish} className="bg-pink-500 hover:bg-pink-600 gap-2" disabled={isAnimating}>
            <RefreshCw className={cn("h-4 w-4", isAnimating && "animate-spin")} />
            New Wish
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

