import './App.css'
import Header  from './components/Header'
import Intro   from './components/Intro'
import About   from './components/About'
import Skills  from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact  from './components/Contact'
import MotionBackground from './components/Motionbackground'

function App() {
  return (
    <>
      {/* Canvas background — fixed, behind everything */}
      <MotionBackground />

      {/* All page content sits above the canvas via relative + z-index */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />

        <section id="home">
          <Intro />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </>
  )
}

export default App