import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { PRELOADER_DONE_EVENT } from "./Preloader"

const navItems = {
  left: [
    { id: "work", label: "work" },
    { id: "about", label: "about" },
  ],
  right: [
    { id: "archive", label: "archive" },
    { id: "contact", label: "contact" },
  ],
}

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState("")
  const lastY = useRef(0)
  const navRef = useRef(null)

  useEffect(() => {
    // Wait for preloader to finish before animating
    const startAnimation = () => {
      const ctx = gsap.context(() => {
        gsap.from(".nav-left-links", {
          y: -40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.1,
        })
        gsap.from(".nav-logo", {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.2,
        })
        gsap.from(".nav-right-links", {
          y: -40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        })
      }, navRef)

      return () => ctx.revert()
    }

    // Listen for preloader done event
    window.addEventListener(PRELOADER_DONE_EVENT, startAnimation)
    
    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, startAnimation)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 100)
      lastY.current = y

      let current = ""
      const all = [...navItems.left, ...navItems.right]
      for (let i = all.length - 1; i >= 0; i--) {
        const el = document.getElementById(all[i].id)
        if (el && el.offsetTop <= y + 200) {
          current = all[i].id
          break
        }
      }
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className={`nav ${hidden ? "nav--hidden" : ""} curzr-hide-on-hover`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div
        className="nav-left-links links-wrapper"
        style={{
          display: "flex",
          gap: 1,
          padding: 2,
          background: "#000",
          borderRadius: 200,
        }}
      >
        {navItems.left.map((item) => (
          <button
            key={item.id}
            className={`link-pill ${active === item.id ? "active" : ""}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <a
        href="#greetings"
        className="nav-logo"
        onClick={(e) => { e.preventDefault(); scrollTo("greetings") }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 16px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 116 116" fill="none">
          <circle cx="58" cy="58" r="54" fill="#000" />
          <text x="58" y="68" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="600" fontFamily="Gabarito, sans-serif">R</text>
        </svg>
      </a>

      <div
        className="nav-right-links links-wrapper"
        style={{
          display: "flex",
          gap: 1,
          padding: 2,
          background: "#000",
          borderRadius: 200,
        }}
      >
        {navItems.right.map((item) => (
          <button
            key={item.id}
            className={`link-pill ${active === item.id ? "active" : ""}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
