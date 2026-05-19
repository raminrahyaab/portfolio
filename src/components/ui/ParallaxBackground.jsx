import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ParallaxBackground({ 
  children, 
  speed = 0.5, 
  direction = "vertical",
  className = "" 
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: direction === "vertical" ? `${-100 * speed}px` : 0,
        x: direction === "horizontal" ? `${-100 * speed}px` : 0,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [speed, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function FloatingShapes({ variant = "default" }) {
  const shapes = variant === "default" 
    ? [
        { size: 300, top: "10%", left: "5%", opacity: 0.05, delay: 0 },
        { size: 200, top: "60%", right: "10%", opacity: 0.03, delay: 0.5 },
        { size: 150, top: "30%", right: "20%", opacity: 0.04, delay: 1 },
        { size: 100, top: "80%", left: "20%", opacity: 0.03, delay: 1.5 },
      ]
    : [
        { size: 250, top: "20%", left: "10%", opacity: 0.04, delay: 0 },
        { size: 180, top: "50%", right: "15%", opacity: 0.03, delay: 0.7 },
        { size: 120, top: "70%", left: "30%", opacity: 0.05, delay: 1.2 },
      ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, idx) => (
        <div
          key={idx}
          className="absolute rounded-full animate-float"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            background: "radial-gradient(circle, var(--body-bg) 0%, transparent 70%)",
            opacity: shape.opacity,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
