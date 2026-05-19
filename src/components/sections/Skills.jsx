import { Container } from "../ui/Container"
import { skills } from "../../data/personalInfo"
import { FloatingShapes } from "../ui/ParallaxBackground"
import { FloatingOrbs } from "../ui/FloatingElements"
import { TextReveal } from "../ui/TextReveal"
import { useStaggeredHover } from "../ui/StaggeredCards"
import { useRef } from "react"

export function Skills() {
  const cardsRef = useRef(null)
  useStaggeredHover(cardsRef, ".skill-card")

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(130, 214, 255, 1) 0%, rgba(205, 239, 255, 0.52) 27%, rgba(214, 242, 255, 0) 100%)",
        }}
      />
      <FloatingOrbs count={4} />
      <FloatingShapes variant="alt" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <p 
              data-animate="up"
              className="text-sm font-medium tracking-wider uppercase" 
              style={{ color: "#666" }}
            >
              What do I specialize in?
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              <TextReveal type="words">
                Here is how i can help you grow your brand and business
              </TextReveal>
            </h2>
          </div>

          <div ref={cardsRef} data-animate-stagger="up" data-stagger="0.15" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="skill-card p-8 rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(85, 193, 250, 0.05) 0%, rgba(0, 134, 184, 0.1) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 group-hover:translate-x-1 transition-transform duration-300" style={{ color: "var(--foreground)" }}>
                    {skill.title}
                  </h3>
                  <p className="text-sm leading-relaxed group-hover:translate-x-1 transition-transform duration-300 delay-75" style={{ color: "#666" }}>
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
