import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SectionTransition({ children, className = "", style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Fade in from bottom when entering
      gsap.fromTo(el, 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

export function FadeInSection({ 
  children, 
  className = "", 
  style = {},
  delay = 0,
  direction = "up"
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const y = direction === "up" ? 40 : direction === "down" ? -40 : 0
    const x = direction === "left" ? 40 : direction === "right" ? -40 : 0

    const ctx = gsap.context(() => {
      gsap.fromTo(el, 
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [delay, direction])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
