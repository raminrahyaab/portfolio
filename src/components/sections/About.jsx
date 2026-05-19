import { Container } from "../ui/Container"
import { personalInfo, traits, focusAreas, experience } from "../../data/personalInfo"
import { FloatingShapes } from "../ui/ParallaxBackground"
import { FloatingOrbs } from "../ui/FloatingElements"
import { TextReveal } from "../ui/TextReveal"

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: "var(--secondary)" }}>
      <FloatingOrbs count={3} />
      <FloatingShapes variant="alt" />
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                <TextReveal type="letters">
                  About
                </TextReveal>
              </h2>
              <div data-animate-stagger="up" data-stagger="0.1" className="space-y-4">
                <p className="text-base leading-relaxed" style={{ color: "#666" }}>
                  {personalInfo.bio}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#666" }}>
                  {personalInfo.availability}
                </p>
              </div>

              <div data-animate="up" data-delay="0.2" className="space-y-3">
                <h3 className="text-sm font-medium tracking-wider uppercase" style={{ color: "#999" }}>
                  Three traits I&apos;m most recognized for by those around me.
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Business and user goal-oriented.", "Business and user goal-oriented.", "Business and user goal-oriented."].map((t, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: "var(--badge-bg)",
                        color: "var(--badge-text-color)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div data-animate="up" data-delay="0.1" className="space-y-4">
                <h3 className="text-sm font-medium tracking-wider uppercase" style={{ color: "#999" }}>
                  Focus Areas
                </h3>
                <div className="space-y-3">
                  {focusAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--body-bg)" }}
                      />
                      <span style={{ color: "var(--foreground)" }}>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 
                  data-animate="up"
                  data-delay="0.2"
                  className="text-sm font-medium tracking-wider uppercase" 
                  style={{ color: "#999" }}
                >
                  Experience & Education
                </h3>
                <div data-animate-stagger="up" data-stagger="0.15">
                  {experience.map((exp) => (
                    <div
                      key={exp.role}
                      className="p-4 rounded-xl mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <p className="font-medium group-hover:text-[var(--body-bg)] transition-colors duration-300" style={{ color: "var(--foreground)" }}>
                        {exp.role}
                      </p>
                      <p className="text-sm" style={{ color: "#666" }}>
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--muted)", color: "#666" }}>
                          {exp.period}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--muted)", color: "#666" }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
