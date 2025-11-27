import { useEffect, useRef, useState } from 'react'
import styles from './Work.module.css'

const Work = () => {
  const sectionRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

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

  return (
    <section
      className={`${styles.work} section`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className={styles.sectionTitle}>Featured Work</h2>
        <p className={styles.sectionSubtitle}>
          Showcasing innovation through thoughtful design and code.
        </p>

        <div className={`${styles.projectCard} ${isInView ? styles.visible : ''}`}>
          <div className={styles.projectImage}>
            <div className={styles.mockup}>
              <iframe
                src="https://lunar-almanac.playgroundofthesenses.com/"
                title="Lunar Almanac PWA"
                className={styles.iframe}
              />
            </div>
          </div>

          <div className={styles.projectInfo}>
            <div className={styles.projectBadge}>
              <span className={styles.badgeIcon}>🌙</span>
              <span>Progressive Web App</span>
            </div>

            <h3 className={styles.projectTitle}>Lunar Almanac</h3>
            <p className={styles.projectDescription}>
              An interactive 13-month lunar calendar that beautifully blends Celtic artistry with modern web technology. Track moon phases, create events, and explore lunar insights in a fully-featured progressive web application.
            </p>

            <ul className={styles.featuresList}>
              <li>🗓️ Interactive 13-month lunar calendar</li>
              <li>🌓 Real-time moon phase tracking</li>
              <li>✨ Event creation and management</li>
              <li>📱 Installable PWA for offline use</li>
              <li>🎨 Celtic-inspired design aesthetic</li>
            </ul>

            <div className={styles.projectLinks}>
              <a
                href="https://lunar-almanac.playgroundofthesenses.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryLink}
              >
                View Live Demo
              </a>
              <span className={styles.comingSoon}>
                📲 App Store — Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
