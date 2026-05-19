import { useState, useEffect, useRef } from "react"

export function useCustomCursor() {
  const cursorRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    const rafLoop = () => {
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15
      cursor.style.transform = `translate(${currentX - 28}px, ${currentY - 28}px) scale(var(--cursor-scale-start))`
      requestAnimationFrame(rafLoop)
    }

    const onInteractiveEnter = (e) => {
      const el = e.currentTarget
      const text = el.dataset.cursor || el.getAttribute("href") ? "View" : ""
      setLabel(text)
      cursor.style.setProperty("--cursor-scale-start", "1.2")
      if (text) cursor.style.width = `${text.length * 10 + 40}px`
    }

    const onInteractiveLeave = () => {
      setLabel("")
      cursor.style.setProperty("--cursor-scale-start", "1")
      cursor.style.width = "56px"
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor], input, textarea, select'
    )

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onInteractiveEnter)
      el.addEventListener("mouseleave", onInteractiveLeave)
    })

    const raf = requestAnimationFrame(rafLoop)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onInteractiveEnter)
        el.removeEventListener("mouseleave", onInteractiveLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [visible])

  return { cursorRef, visible, label }
}
