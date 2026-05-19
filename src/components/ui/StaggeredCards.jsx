import { useEffect, useRef } from "react"

export function useStaggeredHover(containerRef, selector = ".stagger-card") {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(selector)
    
    const handleMouseEnter = (e) => {
      const hoveredCard = e.currentTarget
      cards.forEach((card) => {
        if (card !== hoveredCard) {
          card.style.opacity = "0.5"
          card.style.transform = "scale(0.98)"
        }
      })
      hoveredCard.style.opacity = "1"
      hoveredCard.style.transform = "scale(1.02)"
    }

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        card.style.opacity = "1"
        card.style.transform = "scale(1)"
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
  }, [containerRef, selector])
}

export function StaggeredCardGroup({ children, className = "", style = {} }) {
  const containerRef = useRef(null)
  useStaggeredHover(containerRef)
  
  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  )
}
