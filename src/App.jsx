import { useScrollAnimations } from "./hooks/useScrollAnimations"
import { Hero } from "./components/sections/Hero"
import { Projects } from "./components/sections/Projects"
import { About } from "./components/sections/About"
import { Skills } from "./components/sections/Skills"
import { Goals } from "./components/sections/Goals"
import { Contact } from "./components/sections/Contact"
import { ImageBanner } from "./components/sections/ImageBanner"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Preloader } from "./components/layout/Preloader"
import { CustomCursor } from "./components/CustomCursor"
import { ScrollToTop } from "./components/ui/ScrollToTop"
import { PageTransitionOverlay, SmoothScroll } from "./components/ui/PageTransition"
import { StatsSection } from "./components/ui/CounterAnimation"
import { ScrollProgress, ScrollProgressCircle } from "./components/ui/ScrollProgress"

function App() {
  const sectionRef = useScrollAnimations()

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <SmoothScroll />
      <ScrollProgress />
      <ScrollProgressCircle />
      <main ref={sectionRef} style={{ backgroundColor: "var(--background)" }}>
        <Hero />
        <Projects />
        <StatsSection />
        <ImageBanner />
        <About />
        <Skills />
        <Goals />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <PageTransitionOverlay />
    </>
  )
}

export default App
