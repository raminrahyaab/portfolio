import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function PageTransitionOverlay() {
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Create gradient overlays for each section
    const sections = document.querySelectorAll("section")
    
    sections.forEach((section, index) => {
      // Add subtle fade effect at section boundaries
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.in"
          })
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.in"
          })
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null
}

export function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      e.preventDefault()
      const id = target.getAttribute('href').slice(1)
      const element = document.getElementById(id)
      
      if (element) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power3.inOut"
        })
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return null
}
