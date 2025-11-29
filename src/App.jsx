import Hero from './components/Hero/Hero'
import Philosophy from './components/Philosophy/Philosophy'
import Work from './components/Work/Work'
import Services from './components/Services/Services'
import Journal from './components/Journal/Journal'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import CursorRipple from './components/common/CursorRipple'
import AmbientSound from './components/common/AmbientSound'

function App() {
  return (
    <>
      <CursorRipple />
      <AmbientSound />
      <main>
        <Hero />
        <Philosophy />
        <Work />
        <Services />
        <Journal />
        <About />
        <Contact />
        {/* Footer will go here */}
      </main>
    </>
  )
}

export default App
