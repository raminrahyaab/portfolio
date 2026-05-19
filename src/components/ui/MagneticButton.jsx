import { useRef, useState } from "react"

export function MagneticButton({ 
  children, 
  className = "", 
  style = {},
  strength = 0.4,
  ...props 
}) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) * strength
    const y = (e.clientY - centerY) * strength
    
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={`magnetic-button ${className}`}
      style={{
        display: "inline-block",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.3s ease-out",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}
