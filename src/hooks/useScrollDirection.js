import { useState, useEffect } from "react"

export function useScrollDirection() {
  const [direction, setDirection] = useState("up")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setDirection(y > lastY ? "down" : "up")
      lastY = y
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { direction, scrolled }
}
