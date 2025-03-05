"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FlippingBackgroundProps {
  userImage?: string | null
}

export function FlippingBackground({ userImage }: FlippingBackgroundProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Create an array of images including user image if available
    const backgroundImages = [
      "/trangdt.png",
      "/thaonp1.jpg",
      "/trath.png",
      "/anhnlh.jpg",
    ]

    // if (userImage) {
    //   // Add user image multiple times to make it appear more frequently
    //   backgroundImages.push(userImage, userImage, userImage, userImage, userImage, userImage, userImage, userImage)
    // }

    setImages(backgroundImages);
  }, [userImage])

  return (
    <div className="fixed inset-0 bg-pink-100 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-lg shadow-lg overflow-hidden",
              "animate-flip-random transition-all duration-1000",
              "w-40 h-40 md:w-48 md:h-48",
            )}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              zIndex: 1,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        ))}
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-lg shadow-lg overflow-hidden",
              "animate-flip-random transition-all duration-1000",
              "w-40 h-40 md:w-48 md:h-48",
            )}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              zIndex: 1,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

