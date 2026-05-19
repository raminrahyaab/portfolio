import { Container } from "../ui/Container"
import { TextReveal } from "../ui/TextReveal"

export function Goals() {
  return (
    <section id="goals" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <Container>
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p 
              data-animate="up"
              className="text-sm font-medium tracking-wider uppercase" 
              style={{ color: "#999" }}
            >
              Telenor app aligned with user & business goals.
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              <TextReveal type="letters">
                Business and user goal-oriented.
              </TextReveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-animate="up" data-delay="0.2" className="space-y-6">
              <h3
                className="text-xl font-semibold flex items-center gap-3"
                style={{ color: "var(--foreground)" }}
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "var(--body-bg)", color: "#fff" }}>
                  U
                </span>
                User Goals
              </h3>
              <div className="space-y-4">
                {[
                  "Better navigation.",
                  "Clarity in dense data displays.",
                  "Consistent visual language.",
                  "Logical screen-to-screen flow.",
                  "Improved iconography and imagery.",
                ].map((goal) => (
                  <div key={goal} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: "var(--body-bg)" }}
                    />
                    <span style={{ color: "#666" }}>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-animate="up" data-delay="0.3" className="space-y-6">
              <h3
                className="text-xl font-semibold flex items-center gap-3"
                style={{ color: "var(--foreground)" }}
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "#000", color: "#fff" }}>
                  B
                </span>
                Business Goals
              </h3>
              <div className="space-y-4">
                {[
                  "Increased company trust.",
                  "Reduced cognitive load.",
                  "Shorter learning curve.",
                  "Better accessibility.",
                  "Reduced decision fatigue.",
                ].map((goal) => (
                  <div key={goal} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: "#000" }}
                    />
                    <span style={{ color: "#666" }}>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
