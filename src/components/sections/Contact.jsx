import { Container } from "../ui/Container"
import { personalInfo } from "../../data/personalInfo"
import { FloatingShapes } from "../ui/ParallaxBackground"
import { FloatingParticles } from "../ui/FloatingElements"
import { TextReveal } from "../ui/TextReveal"
import { MagneticButton } from "../ui/MagneticButton"

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #ffd98f 0%, #fffaf0 50%, #fff 100%)",
        }}
      />
      <FloatingParticles count={10} color="rgba(255, 217, 143, 0.3)" />
      <FloatingShapes />
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p 
              data-animate="up"
              className="text-sm font-medium tracking-wider uppercase" 
              style={{ color: "#999" }}
            >
              It is really easy to reach me, drop me a note.
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              <TextReveal type="words">
                I&apos;m curious to grow your business through design solutions.
              </TextReveal>
            </h2>
          </div>

          <MagneticButton strength={0.3}>
            <a
              href={`mailto:${personalInfo.email}`}
              data-animate="up"
              data-delay="0.2"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                background: "#000",
                color: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              }}
            >
              {personalInfo.email}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>

          <div 
            data-animate="up"
            data-delay="0.3"
            className="flex items-center justify-center gap-8 pt-8"
          >
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-70"
              style={{ color: "#666" }}
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-70"
              style={{ color: "#666" }}
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-70"
              style={{ color: "#666" }}
            >
              X
            </a>
          </div>

          <p 
            data-animate="up"
            data-delay="0.4"
            className="text-sm" 
            style={{ color: "#999" }}
          >
            {personalInfo.location}
          </p>
        </div>
      </Container>
    </section>
  )
}
