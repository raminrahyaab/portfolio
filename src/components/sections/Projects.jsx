import { Container } from "../ui/Container"
import { projects } from "../../data/projects"
import { TextReveal } from "../ui/TextReveal"
import { MagneticButton } from "../ui/MagneticButton"

// Import project images
const projectImages = import.meta.glob("../../assets/project-*.png", { eager: true, as: "url" })

const getProjectImage = (imageName) => {
  if (!imageName) return null
  const key = `../../assets/${imageName}`
  return projectImages[key] || null
}

export function Projects() {
  return (
    <section id="work" className="py-24" style={{ backgroundColor: "var(--secondary)" }}>
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p 
              data-animate="up"
              className="text-sm font-medium tracking-wider uppercase" 
              style={{ color: "#999" }}
            >
              Showcasing thoughtful work
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              <TextReveal type="words">
                Featured Case Studies
              </TextReveal>
            </h2>
          </div>

          <div className="space-y-8">
            {projects.map((project, idx) => {
              const projectImage = getProjectImage(project.image)
              
              return (
                <div
                  key={project.id}
                  data-animate="up"
                  data-delay={0.15 + idx * 0.1}
                  className="case-study-card curzr-hover-view rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  data-cursor={project.status === "Full Case Study" ? "Explore the redesigned work" : "See what's improved"}
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div
                      className="lg:col-span-2 h-64 lg:h-auto flex items-center justify-center relative overflow-hidden group"
                      style={{
                        background: projectImage
                          ? "var(--card)"
                          : idx === 0
                          ? "linear-gradient(135deg, #55c1fa 0%, #0086b8 100%)"
                          : idx === 1
                          ? "linear-gradient(135deg, #ffd98f 0%, #ffb347 100%)"
                          : "linear-gradient(135deg, #86e000 0%, #5f9b03 100%)",
                      }}
                    >
                      {projectImage ? (
                        <>
                          <img
                            src={projectImage}
                            alt={project.title}
                            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(85, 193, 250, 0.1) 0%, rgba(0, 134, 184, 0.2) 100%)",
                            }}
                          />
                        </>
                      ) : (
                        <span className="text-8xl font-bold opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-30" style={{ color: "#fff" }}>
                          {project.title.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="lg:col-span-3 p-6 sm:p-8 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="badge">
                          <span className="badge-dot" />
                          <span className="badge-text">{project.badge}</span>
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--muted)", color: "#666" }}>
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                        {project.title}
                      </h3>

                      <div className="space-y-3">
                        {project.points.map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--body-bg)" }} />
                            <span className="text-sm" style={{ color: "#666" }}>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{ backgroundColor: "var(--muted)", color: "#666" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <MagneticButton strength={0.3}>
                          <a
                            href={project.link}
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                            style={{ color: "var(--body-bg)" }}
                          >
                            {project.status}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
