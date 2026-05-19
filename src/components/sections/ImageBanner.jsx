import { Container } from "../ui/Container"
import { TextReveal } from "../ui/TextReveal"

// Import project images statically
import projectPos from "../../assets/project-pos.png"
import projectTelenor from "../../assets/project-telenor.png"
import projectAlitech from "../../assets/project-alitech.png"

const projectImages = [
  { src: projectPos, alt: "POS Project" },
  { src: projectTelenor, alt: "Telenor Project" },
  { src: projectAlitech, alt: "Alitech Project" },
]

const row1 = [...projectImages, ...projectImages, ...projectImages, ...projectImages]
const row2 = [...projectImages, ...projectImages, ...projectImages, ...projectImages]
const row3 = [...projectImages, ...projectImages, ...projectImages, ...projectImages]

export function ImageBanner() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Container>
        <div className="text-center space-y-4 mb-12">
          <p 
            data-animate="up"
            className="text-sm font-medium tracking-wider uppercase" 
            style={{ color: "#999" }}
          >
            Trusted by amazing clients
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            <TextReveal type="letters">
              Projects I've Worked On
            </TextReveal>
          </h2>
        </div>
      </Container>

      <div className="space-y-6">
        {/* Row 1 - Scrolling Left */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-left">
            {row1.map((img, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex-shrink-0 w-72 h-44 rounded-2xl overflow-hidden group"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: "var(--card)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-right">
            {row2.map((img, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex-shrink-0 w-72 h-44 rounded-2xl overflow-hidden group"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: "var(--card)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - Scrolling Left */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-left">
            {row3.map((img, idx) => (
              <div
                key={`row3-${idx}`}
                className="flex-shrink-0 w-72 h-44 rounded-2xl overflow-hidden group"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: "var(--card)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
