import { useState, useEffect } from "react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ease-out z-40 group overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #55c1fa 0%, #0086b8 100%)",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(0, 134, 184, 0.4)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-label="Scroll to top"
    >
      {/* Default arrow */}
      <svg 
        className="w-6 h-6 absolute transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
      
      {/* Hover double arrow */}
      <svg 
        className="w-6 h-6 absolute transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7 7 7" />
      </svg>
      
      {/* Pulse ring effect */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: "linear-gradient(135deg, #55c1fa 0%, #0086b8 100%)",
          opacity: 0.3,
        }}
      />
    </button>
  )
}
