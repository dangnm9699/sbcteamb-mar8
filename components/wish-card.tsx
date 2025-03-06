"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart } from "lucide-react"
import type { User } from "next-auth"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

// const wishes = [
//   `Nắng đã có mũ, mưa đã có ô</br>Cảm nắng vì có người con gái đáng yêu ở đây tại Team B cùng anh em chúng mình.</br>Cảm ơn cậu vì đã luôn cố gắng hết mình để trở thành phiên bản tốt nhất.</br>Hãy tin rằng, mọi sự cố gắng đều sẽ được đền đáp xứng đáng và đừng lo nhé vì đã có anh em Team B chống lưng đây rồi!`,
//   `Chúc mừng ngày Quốc tế Phụ Nữ 08/03</br></br>Chúc bạn tay ôm đầy hoa, túi xách đầy quà, có tình đầy tim nhé!`,
//   `Dù cho tận thế vẫn thấy cậu xinh - vẫn thấy cậu xinh</br></br>Chúc cậu một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`,
//   `"Sống hết mình, sống trọn phút giây chân tình</br>Thanh xuân đang chờ, bình yên thật đẹp như mơ"</br></br>Chúc cậu - cô gái xinh đẹp đang đọc tấm thiệp này, một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`,
//   `Thông điệp gửi đến cô gái mạnh mẽ và đáng yêu của anh em Team B:</br></br>" Love Yourself, Trust Yourself "</br></br>Hãy luôn tự tin rằng cậu có vẻ đẹp đặc biệt, vẻ đẹp ấy là độc nhất vô nhị và với anh em chúng mình cậu luôn tuyệt vời. Vậy nên hãy cười thật nhiều nhé!`,
//   `Miệng cười xinh, mắt to, lung linh nhìn cậu cứ như thiên thần</br>Tại sao cậu lại đẹp đến như vậy?</br>---</br>Trái Đất thật đẹp khi có nàng thơ là cậu đó!</br>Chúc cậu một ngày 08.03 vui vẻ và nhiều ý nghĩa, hãy luôn tự tin và tỏa sáng nhé!`
// ]

const wishes = [
    "Nhân ngày 8/3, xin gửi đến EM những lời chúc tốt đẹp nhất! Chúc EM luôn xinh đẹp như những đóa hoa tươi thắm, rạng rỡ như ánh nắng ban mai, và hạnh phúc ngập tràn trong từng khoảnh khắc. Mong rằng mỗi ngày trôi qua, EM đều được yêu thương, trân trọng và sống thật rực rỡ như chính con người tuyệt vời của mình!",
    "Chúc EM một ngày 8/3 thật trọn vẹn niềm vui và ý nghĩa! Mong EM luôn giữ được nụ cười tươi tắn trên môi, sự tự tin trong từng bước đi, và trái tim ấm áp để lan tỏa yêu thương. Hãy để ngày đặc biệt này trở thành dịp để EM được cưng chiều, nâng niu như nàng công chúa xinh đẹp nhất!",
    "Ngày 8/3 đến rồi, chúc EM yêu quý của chúng tôi luôn mạnh mẽ như ngọn gió, dịu dàng như làn mây, và tỏa sáng như những vì sao trên bầu trời. Mong rằng cuộc sống sẽ luôn mang đến cho EM những điều ngọt ngào, những giấc mơ thành hiện thực, và những người yêu thương luôn ở bên cạnh để cùng chia sẻ mọi niềm vui, nỗi buồn!",
    "Nhân ngày Quốc tế Phụ nữ, xin chúc EM không chỉ xinh đẹp, duyên dáng mà còn thật hạnh phúc và thành công trong mọi lĩnh vực của cuộc sống. Mong EM luôn được trân trọng, được lắng nghe, và nhận được những điều tuyệt vời nhất, bởi vì EM chính là những bông hoa quý giá làm đẹp cho thế giới này!",
    "Chúc EM một ngày 8/3 thật rực rỡ và đáng nhớ! Mong rằng mỗi ngày trôi qua, EM đều cảm nhận được sự yêu thương từ những người xung quanh, được sống đúng với đam mê của mình, và luôn giữ được vẻ đẹp trong tâm hồn lẫn ngoại hình. Hãy luôn tự hào vì mình là phụ nữ - những người tuyệt vời nhất trên đời!",
    "Ngày 8/3 này, xin gửi đến EM lời chúc chân thành nhất từ trái tim! Chúc EM luôn khỏe mạnh, vui vẻ, gặp nhiều may mắn và thành công trong công việc cũng như cuộc sống. Mong rằng EM sẽ luôn được yêu thương, che chở, và có những giây phút thật bình yên bên gia đình, bạn bè và những người thân yêu nhất!",
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

