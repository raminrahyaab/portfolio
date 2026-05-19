import { useEffect, useRef } from "react"
import gsap from "gsap"

export function FloatingParticles({ count = 20, color = "var(--body-bg)" }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `
      container.appendChild(particle)
      particles.push(particle)

      // Animate each particle
      gsap.to(particle, {
        y: `${Math.random() * 100 - 50}`,
        x: `${Math.random() * 100 - 50}`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      })
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [count, color])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export function FloatingOrbs({ count = 3 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const orbs = []
    const colors = [
      "radial-gradient(circle, rgba(85, 193, 250, 0.15) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(0, 134, 184, 0.1) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(134, 224, 0, 0.08) 0%, transparent 70%)",
    ]

    for (let i = 0; i < count; i++) {
      const orb = document.createElement("div")
      const size = Math.random() * 200 + 100
      orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 80 + 10}%;
        pointer-events: none;
        filter: blur(40px);
      `
      container.appendChild(orb)
      orbs.push(orb)

      // Floating animation
      gsap.to(orb, {
        y: `${Math.random() * 60 - 30}`,
        x: `${Math.random() * 60 - 30}`,
        scale: Math.random() * 0.3 + 0.85,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      })
    }

    return () => {
      orbs.forEach(o => o.remove())
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export function GradientMesh() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div 
        className="absolute w-[600px] h-[600px] -top-20 -left-20 animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(85, 193, 250, 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] top-1/2 -right-20 animate-blob animation-delay-2000"
        style={{
          background: "radial-gradient(circle, rgba(0, 134, 184, 0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] -bottom-20 left-1/3 animate-blob animation-delay-4000"
        style={{
          background: "radial-gradient(circle, rgba(134, 224, 0, 0.05) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  )
}
