import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Mouse parallax effect - subtle movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Normalize to -1 to 1 range, then scale down for subtlety
      const x = ((clientX / innerWidth) - 0.5) * 2
      const y = ((clientY / innerHeight) - 0.5) * 2

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-based fade for depth + video performance optimization
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Pause video when scrolled past Hero section for performance
      if (videoRef.current) {
        if (currentScrollY > window.innerHeight) {
          videoRef.current.pause()
        } else {
          videoRef.current.play().catch(() => {
            // Ignore autoplay errors
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate parallax transforms
  const getParallaxStyle = (strength) => {
    return {
      transform: `translate(${mousePosition.x * strength}px, ${mousePosition.y * strength}px)`
    }
  }

  const scrollOpacity = Math.max(0, 1 - (scrollY / 400))

  // Get background video parallax style
  const bgVideoStyle = {
    transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) scale(1.1)`
  }

  return (
    <section className={styles.hero} ref={heroRef} style={{ opacity: scrollOpacity }}>
      {/* Background video with parallax */}
      <div className={styles.bgVideo} style={bgVideoStyle}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-forest-mist.webp"
          className={styles.video}
          preload="auto"
        >
          <source src="/video/hero-forest-mist.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
      </div>

      {/* Layered organic color washes */}
      <div className={styles.bgLayer1} style={getParallaxStyle(10)}></div>
      <div className={styles.bgLayer2} style={getParallaxStyle(20)}></div>
      <div className={styles.bgLayer3} style={getParallaxStyle(5)}></div>

      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.headline} style={getParallaxStyle(3)}>
            Digital spaces that breathe with story and life.
          </h1>
          <p className={styles.subhead} style={getParallaxStyle(6)}>
            Sites shaped by nature, narrative, and community—designed to bring people together.
          </p>
          <div className={styles.ctas} style={getParallaxStyle(4)}>
            <a href="#work" className={styles.primaryCta}>
              See my work
            </a>
            <a href="#contact" className={styles.secondaryCta}>
              Tell me your story
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
