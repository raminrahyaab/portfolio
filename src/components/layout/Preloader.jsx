import { useState, useEffect } from "react"

// Global event to signal when preloader is done
export const PRELOADER_DONE_EVENT = "preloaderDone"

export function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      // Dispatch event when preloader finishes
      window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT))
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "#f2f3f5" }}
    >
      <div className="mm-loader-wrapper">
        <div className="mm-roller">
          <div className="shadow" />
        </div>
        <div className="mm-loader-text" style={{ color: "#0b1726" }}>
          Portfolio
        </div>
      </div>
    </div>
  )
}
