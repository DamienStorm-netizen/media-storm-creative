import Hero from './components/Hero/Hero'
import Philosophy from './components/Philosophy/Philosophy'
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
        {/* Work, Services, Journal, About, Contact, Footer will go here */}
      </main>
    </>
  )
}

export default App
