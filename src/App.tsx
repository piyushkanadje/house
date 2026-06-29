import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experiences from './components/Experiences'
import Packages from './components/Packages'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Policies from './components/Policies'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import SeoSchema from './components/SeoSchema'

export default function App() {
  return (
    <>
      <SeoSchema />
      <Navbar />
      <main>
        <Hero />
        <Packages />
        <Experiences />
        <Gallery />
        <About />
        <Testimonials />
        <Location />
        <Contact />
        <Policies />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
