import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function TextReveal({ 
  children, 
  type = "words", 
  delay = 0,
  className = "",
  style = {}
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (type === "letters") {
        // Split into letters
        const text = el.textContent
        el.innerHTML = text.split("").map(char => 
          `<span class="letter inline-block">${char === " " ? "&nbsp;" : char}</span>`
        ).join("")
        
        const letters = el.querySelectorAll(".letter")
        
        gsap.fromTo(letters, 
          { y: 40, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.03,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      } else {
        // Split into words
        const words = el.textContent.split(" ")
        el.innerHTML = words.map(word => 
          `<span class="word inline-block">${word}</span>`
        ).join(" ")
        
        const wordElements = el.querySelectorAll(".word")
        
        gsap.fromTo(wordElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [type, delay])

  return (
    <span ref={ref} className={className} style={style}>
      {children}
    </span>
  )
}

export function HeadingReveal({ 
  children, 
  className = "",
  style = {}
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Get the text content
      const text = el.textContent
      el.innerHTML = ""
      
      // Create wrapper for animation
      const wrapper = document.createElement("span")
      wrapper.className = "inline-block overflow-hidden"
      
      // Create inner span that will animate
      const inner = document.createElement("span")
      inner.className = "inline-block"
      inner.textContent = text
      inner.style.transform = "translateY(100%)"
      
      wrapper.appendChild(inner)
      el.appendChild(wrapper)
      
      gsap.to(inner, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", overflow: "hidden", ...style }}>
      {children}
    </span>
  )
}
