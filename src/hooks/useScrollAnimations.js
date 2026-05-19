import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Animate individual elements with data-animate attribute
      const animatedElements = el.querySelectorAll("[data-animate]")
      
      animatedElements.forEach((element) => {
        const direction = element.dataset.animate || "up"
        const delay = parseFloat(element.dataset.delay) || 0
        const y = direction === "up" ? 50 : direction === "down" ? -50 : 0
        const x = direction === "left" ? 50 : direction === "right" ? -50 : 0

        gsap.fromTo(
          element,
          { y, x, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })

      // Staggered animations for groups with data-animate-stagger
      const staggerGroups = el.querySelectorAll("[data-animate-stagger]")
      
      staggerGroups.forEach((group) => {
        const children = group.querySelectorAll(":scope > *")
        const direction = group.dataset.animateStagger || "up"
        const staggerDelay = parseFloat(group.dataset.stagger) || 0.1
        const y = direction === "up" ? 40 : direction === "down" ? -40 : 0
        const x = direction === "left" ? 40 : direction === "right" ? -40 : 0

        gsap.fromTo(
          children,
          { y, x, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: staggerDelay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })

      // Parallax elements with data-parallax
      const parallaxElements = el.querySelectorAll("[data-parallax]")
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.parallax) || 0.5
        const direction = element.dataset.parallaxDirection || "vertical"
        
        gsap.to(element, {
          y: direction === "vertical" ? `${-100 * speed}px` : 0,
          x: direction === "horizontal" ? `${-100 * speed}px` : 0,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
