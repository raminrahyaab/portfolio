import { Container } from "../ui/Container"

const testimonials = [
  {
    quote: "Working with Mehdi was a game-changer for our product. The design thinking and attention to detail exceeded our expectations.",
    author: "Sarah Chen",
    role: "Founder, TechStart",
  },
  {
    quote: "The motion design work brought our brand to life. Our engagement metrics have never been better.",
    author: "James Wilson",
    role: "CMO, GrowthLab",
  },
  {
    quote: "Mehdi's ability to understand our users and translate that into beautiful design is remarkable.",
    author: "Alex Rivera",
    role: "Product Lead, ScaleUp",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            What People Say
          </h2>
          <p className="text-lg" style={{ color: "var(--foreground)", opacity: 0.7 }}>
            Kind words from amazing clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-8 rounded-2xl flex flex-col justify-between"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--foreground)", opacity: 0.8 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {t.author}
                </p>
                <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.5 }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
