import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { personalInfo } from "../../data/personalInfo"
import { Container } from "../ui/Container"
import { PRELOADER_DONE_EVENT } from "../layout/Preloader"
import { FloatingShapes } from "../ui/ParallaxBackground"
import { FloatingParticles, GradientMesh } from "../ui/FloatingElements"
import { MagneticButton } from "../ui/MagneticButton"
import profileImage from "../../assets/profile.png"

export function Hero() {
  const heroRef = useRef(null)
  const [displayedText, setDisplayedText] = useState("")
  const fullText = personalInfo.greeting

  useEffect(() => {
    // Wait for preloader to finish before animating
    const startAnimation = () => {
      // Typewriter effect
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 60) // 60ms per character

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        // Hero animations start immediately after preloader (no delay needed)
        tl.from(".hero-location", {
          y: 40,
          opacity: 0,
          duration: 0.7,
        })
        .from(".hero-title", {
          y: 60,
          opacity: 0,
          duration: 0.9,
        }, "-=0.4")
        .from(".hero-tagline", {
          y: 40,
          opacity: 0,
          duration: 0.7,
        }, "-=0.5")
        .from(".hero-bio", {
          y: 40,
          opacity: 0,
          duration: 0.7,
        }, "-=0.4")
        .from(".hero-buttons", {
          y: 30,
          opacity: 0,
          duration: 0.6,
        }, "-=0.4")
        .from(".hero-avatar-outer", {
          scale: 0.7,
          opacity: 0,
          duration: 1,
        }, "-=0.8")
        .from(".hero-avatar-middle", {
          scale: 0.7,
          opacity: 0,
          duration: 0.8,
        }, "-=0.6")
        .from(".hero-avatar-inner", {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.5")

      }, heroRef)

      return () => ctx.revert()
    }

    // Listen for preloader done event
    window.addEventListener(PRELOADER_DONE_EVENT, startAnimation)
    
    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, startAnimation)
    }
  }, [])

  // Split text for styling
  const words = displayedText.split(" ")
  const firstPart = words.slice(0, 3).join(" ")
  const secondPart = words.slice(3).join(" ")

  return (
    <section id="greetings" ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #fff 0%, #f5fcffcc 37%, #0086b8cc 100%)",
        }}
      />
      <GradientMesh />
      <FloatingShapes />
      <FloatingParticles count={15} />
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
          <div className="flex-1 space-y-6">
            <p className="hero-location text-sm font-medium tracking-wider uppercase" style={{ color: "#666" }}>
              {personalInfo.location}
            </p>
            <h1
              className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              {firstPart}{" "}
              <span style={{ color: "var(--body-bg)" }}>
                {secondPart}
              </span>
              <span className="animate-pulse" style={{ color: "var(--body-bg)" }}>|</span>
            </h1>
            <p className="hero-tagline text-xl font-medium" style={{ color: "var(--foreground)" }}>
              {personalInfo.tagline}
            </p>
            <p className="hero-bio text-base max-w-xl leading-relaxed" style={{ color: "#666" }}>
              {personalInfo.bio}
            </p>
            <div className="hero-buttons flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
                  style={{
                    background: "#000",
                    color: "#fff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Let&apos;s talk
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
                  style={{
                    border: "2px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  View work
                </a>
              </MagneticButton>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className="hero-avatar-outer w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center relative overflow-hidden"
            >
              <img
                src={profileImage}
                alt={personalInfo.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.1 }}
              />
              <div
                className="hero-avatar-middle w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.15 }}
                />
              </div>
              <div
                className="hero-avatar-inner w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden"
                style={{
                  boxShadow: "0 20px 60px rgba(0,134,184,0.3)",
                }}
              >
                <img
                  src={profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
