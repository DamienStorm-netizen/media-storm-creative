import { useEffect, useRef, useState } from 'react'
import styles from './Philosophy.module.css'

const Philosophy = () => {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const pillars = [
    {
      id: 'nature',
      title: 'Nature',
      description: 'Design that feels alive and balanced.',
      color: 'var(--moss)',
      icon: '🌲'
    },
    {
      id: 'story',
      title: 'Story',
      description: 'Every site as a narrative worth telling.',
      color: 'var(--cedar)',
      icon: '📖'
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Technology that brings people closer.',
      color: 'var(--river)',
      icon: '👥'
    }
  ]

  // Track mouse movement for tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-triggered reveal with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Track scroll progress through section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far through the section we've scrolled (0 to 1)
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        )
      )

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={`${styles.philosophy} section`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className={styles.sectionTitle}>Three Pillars</h2>

        <div className={styles.pillarsContainer}>
          {pillars.map((pillar, index) => {
            // Calculate individual card transforms
            const baseDelay = index * 0.15
            const tiltX = mousePosition.y * 8
            const tiltY = -mousePosition.x * 8
            const translateY = isInView ? 0 : 100

            // Staggered reveal based on scroll progress
            const revealProgress = Math.max(0, (scrollProgress - baseDelay) * 2)
            const opacity = Math.min(1, revealProgress)
            const scale = 0.9 + (revealProgress * 0.1)

            return (
              <div
                key={pillar.id}
                className={`${styles.pillarCard} ${isInView ? styles.visible : ''}`}
                style={{
                  '--pillar-color': pillar.color,
                  '--index': index,
                  transform: `
                    perspective(1000px)
                    rotateX(${tiltX}deg)
                    rotateY(${tiltY}deg)
                    translateY(${translateY}px)
                    scale(${scale})
                  `,
                  opacity: opacity,
                  transitionDelay: `${baseDelay}s`
                }}
              >
                <div className={styles.cardInner}>
                  <span className={styles.icon}>{pillar.icon}</span>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDescription}>{pillar.description}</p>

                  {/* Decorative accent line */}
                  <div className={styles.accentLine}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Philosophy
