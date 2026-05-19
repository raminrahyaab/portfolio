import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Counter({ 
  end, 
  duration = 2, 
  suffix = "", 
  prefix = "",
  className = "",
  style = {}
}) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true
            
            const obj = { value: 0 }
            gsap.to(obj, {
              value: end,
              duration,
              ease: "power2.out",
              onUpdate: () => {
                setCount(Math.round(obj.value))
              },
            })
          }
        },
      })
    }, el)

    return () => ctx.revert()
  }, [end, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef(null)
  const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "+", label: "Projects Completed" },
    { value: 10, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(".stat-card")
    
    const handleMouseEnter = (e) => {
      const hoveredCard = e.currentTarget
      cards.forEach((card) => {
        if (card !== hoveredCard) {
          card.style.opacity = "0.5"
          card.style.transform = "scale(0.95)"
        }
      })
      hoveredCard.style.opacity = "1"
      hoveredCard.style.transform = "scale(1.05) translateY(-8px)"
    }

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        card.style.opacity = "1"
        card.style.transform = "scale(1) translateY(0)"
      })
    }

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="stat-card text-center p-6 rounded-2xl transition-all duration-400"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "var(--body-bg)" }}
              >
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base" style={{ color: "#666" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
