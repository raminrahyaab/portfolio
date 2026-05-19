import { Container } from "../ui/Container"
import { personalInfo } from "../../data/personalInfo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8" style={{ backgroundColor: "var(--background)" }}>
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#999" }}>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "#999" }}>
            Designed & built with passion
          </p>
        </div>
      </Container>
    </footer>
  )
}
