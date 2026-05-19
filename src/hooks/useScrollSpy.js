import { useState, useEffect } from "react"

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset
      let current = ""

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActiveId(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, offset])

  return activeId
}
