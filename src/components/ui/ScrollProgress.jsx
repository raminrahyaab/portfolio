import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-50"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{
          background: "linear-gradient(90deg, #55c1fa 0%, #0086b8 100%)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  )
}

export function ScrollProgressCircle() {
  const circleRef = useRef(null)

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const ctx = gsap.context(() => {
      gsap.to(circle, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="fixed bottom-6 left-6 z-40 w-12 h-12"
      style={{ pointerEvents: "none" }}
    >
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={100.53}
          strokeDashoffset={100.53}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#55c1fa" />
            <stop offset="100%" stopColor="#0086b8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Percentage text in center */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        <ScrollPercentage />
      </div>
    </div>
  )
}

function ScrollPercentage() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          el.textContent = Math.round(self.progress * 100) + "%"
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return <span ref={ref}>0%</span>
}
