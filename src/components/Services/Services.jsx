import { useEffect, useRef, useState } from 'react'
import styles from './Services.module.css'

const Services = () => {
  const sectionRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  const services = [
    {
      id: 'design',
      title: 'Design & Storycraft',
      description: 'Websites shaped with narrative intention and visual harmony.',
      icon: '✨',
      color: 'var(--moss)'
    },
    {
      id: 'development',
      title: 'Development & Sitecare',
      description: 'Clean, stable code with long-term support—your digital home maintained with care.',
      icon: '🏡',
      color: 'var(--cedar)'
    },
    {
      id: 'content',
      title: 'Content & Creative Guidance',
      description: 'Helping you tell your story clearly, thoughtfully, and with heart.',
      icon: '💬',
      color: 'var(--river)'
    }
  ]

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
      className={`${styles.services} section`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className={styles.sectionTitle}>How I Can Help</h2>
        <p className={styles.sectionSubtitle}>
          Three ways to bring your vision to life with care and craft.
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.serviceCard} ${isInView ? styles.visible : ''}`}
              style={{
                '--service-color': service.color,
                transitionDelay: `${index * 0.15}s`
              }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>

              {/* Decorative accent line */}
              <div className={styles.accentLine}></div>
            </div>
          ))}
        </div>

        {/* Single CTA at bottom */}
        <div className={styles.ctaWrapper}>
          <p className={styles.ctaText}>
            Ready to start something meaningful together?
          </p>
          <a href="#contact" className={styles.ctaButton}>
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
