import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef(null)
  const iconWrapRef = useRef(null)
  const labelRef = useRef(null)
  const handRef = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({
    mx: -9999, my: -9999,
    cx: -9999, cy: -9999,
    mode: "default",
  })

  // Trail particles
  const trailRef = useRef([])
  const trailCount = 8
  const trailPositions = useRef([])

  useEffect(() => {
    const state = stateRef.current
    const lerp = (a, b, t) => a + (b - a) * t

    // Initialize trail positions
    for (let i = 0; i < trailCount; i++) {
      trailPositions.current[i] = { x: -9999, y: -9999 }
    }

    const onMouse = (e) => { state.mx = e.clientX; state.my = e.clientY }
    const onLeave = () => { 
      if (cursorRef.current) cursorRef.current.style.opacity = "0"
      trailRef.current.forEach(t => { if (t) t.style.opacity = "0" })
    }
    const onEnter = () => { 
      if (cursorRef.current) cursorRef.current.style.opacity = "1"
      trailRef.current.forEach(t => { if (t) t.style.opacity = "1" })
    }

    const setDefault = () => {
      state.mode = "default"
      const el = cursorRef.current
      if (!el) return
      el.classList.remove("hand")
      el.style.background = "transparent"
      if (iconWrapRef.current) iconWrapRef.current.style.display = "flex"
      if (handRef.current) handRef.current.style.display = "none"
      if (labelRef.current) { labelRef.current.style.opacity = "0"; labelRef.current.style.transform = "translateY(4px)" }
    }

    const setHand = () => {
      state.mode = "hand"
      const el = cursorRef.current
      if (!el) return
      el.classList.add("hand")
      if (iconWrapRef.current) iconWrapRef.current.style.display = "none"
      if (handRef.current) handRef.current.style.display = "flex"
      if (labelRef.current) { labelRef.current.style.opacity = "0"; labelRef.current.style.transform = "translateY(4px)" }
    }

    const setText = (text) => {
      state.mode = "text"
      const el = cursorRef.current
      if (!el) return
      el.classList.remove("hand")
      el.style.background = "transparent"
      if (iconWrapRef.current) iconWrapRef.current.style.display = "none"
      if (handRef.current) handRef.current.style.display = "none"
      if (labelRef.current) {
        labelRef.current.textContent = text
        labelRef.current.style.opacity = "1"
        labelRef.current.style.transform = "translateY(0)"
      }
    }

    const getText = (el) => {
      if (el.dataset.cursor) return el.dataset.cursor
      const p = el.closest("[data-cursor]")
      if (p) return p.dataset.cursor
      return ""
    }

    const isLinkOrButton = (el) => {
      if (!el) return false
      if (el.tagName === "A" || el.tagName === "BUTTON") return true
      if (el.closest("a") || el.closest("button")) return true
      return false
    }

    const onHoverIn = (e) => {
      const el = e.currentTarget
      const text = getText(el)
      if (text) { setText(text); return }
      if (isLinkOrButton(el)) { setHand(); return }
      setHand()
    }

    const onHoverOut = () => setDefault()

    document.addEventListener("mousemove", onMouse)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor], .curzr-hover-view").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
        el.addEventListener("mouseenter", onHoverIn)
        el.addEventListener("mouseleave", onHoverOut)
      })
    }

    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    const loop = () => {
      // Update main cursor
      state.cx += (state.mx - state.cx) * 0.15
      state.cy += (state.my - state.cy) * 0.15
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${state.cx - 12}px, ${state.cy - 12}px)`
      }

      // Update trail particles
      for (let i = 0; i < trailCount; i++) {
        const trail = trailPositions.current[i]
        const target = i === 0 
          ? { x: state.cx, y: state.cy }
          : trailPositions.current[i - 1]
        
        trail.x += (target.x - trail.x) * (0.3 - i * 0.02)
        trail.y += (target.y - trail.y) * (0.3 - i * 0.02)

        if (trailRef.current[i]) {
          const size = 8 - i * 0.8
          trailRef.current[i].style.transform = `translate(${trail.x - size/2}px, ${trail.y - size/2}px) scale(${1 - i * 0.1})`
        }
      }

      if (state.mode === "text" && labelRef.current) {
        labelRef.current.style.left = `${state.cx + 16}px`
        labelRef.current.style.top = `${state.cy - 18}px`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener("mousemove", onMouse)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      obs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRef.current[i] = el}
          className="cursor-trail"
          style={{
            position: "fixed",
            width: `${8 - i * 0.8}px`,
            height: `${8 - i * 0.8}px`,
            borderRadius: "50%",
            background: `rgba(85, 193, 250, ${0.4 - i * 0.04})`,
            pointerEvents: "none",
            zIndex: 9998 - i,
            transform: "translate(-9999px, -9999px)",
            transition: `opacity 0.3s ease`,
          }}
        />
      ))}
      
      <div ref={cursorRef} className="curzr-circle" style={{ transform: "translate(-9999px, -9999px)" }}>
        <span ref={iconWrapRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="1" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="23" y2="12" />
          </svg>
        </span>
        <span ref={handRef} style={{ display: "none", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 11V7a2 2 0 0 1 4 0v1" />
            <path d="M11 9V5a2 2 0 0 1 4 0v4" />
            <path d="M15 10V7a2 2 0 0 1 4 0v5a6 6 0 0 1-6 6h-2a5 5 0 0 1-5-5v-2a2 2 0 0 1 4 0v1" />
          </svg>
        </span>
      </div>
      <span
        ref={labelRef}
        className="curzr-view-text"
        style={{
          opacity: 0,
          transform: "translateY(4px)",
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  )
}
