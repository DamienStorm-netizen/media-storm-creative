import { useEffect, useRef, useState } from 'react'
import styles from './Journal.module.css'

const Journal = () => {
  const sectionRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  // Journal entries - manually curated for now
  const articles = [
    {
      id: 'lunar-almanac-deep-dive',
      title: 'Building the Lunar Almanac: A Journey Through Time and Code',
      excerpt: 'A deep dive into creating a 13-month lunar calendar PWA that blends Celtic artistry with modern web technology. From concept to completion, explore the technical challenges, design decisions, and magical moments that brought this project to life.',
      date: 'December 2024',
      readTime: '12 min read',
      category: 'Deep Dive',
      url: '#', // Replace with actual Substack URL when ready
      featured: true
    },
    {
      id: 'design-philosophy',
      title: 'Why Every Website Deserves a Story',
      excerpt: 'Exploring the intersection of narrative design and web development, and why the best digital experiences feel like journeys rather than destinations.',
      date: 'November 2024',
      readTime: '5 min read',
      category: 'Design',
      url: '#',
      featured: false
    },
    {
      id: 'nature-inspired-web',
      title: 'Nature as Interface: Organic Patterns in Digital Design',
      excerpt: 'How the rhythms and patterns of the natural world can inform more intuitive, human-centered web experiences.',
      date: 'October 2024',
      readTime: '7 min read',
      category: 'Philosophy',
      url: '#',
      featured: false
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

  const featuredArticle = articles.find(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <section
      className={`${styles.journal} section`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className={styles.sectionTitle}>From the Journal</h2>
        <p className={styles.sectionSubtitle}>
          Stories, insights, and reflections on craft, code, and creativity.
        </p>

        {/* Featured Article - Deep Dive */}
        {featuredArticle && (
          <article className={`${styles.featuredArticle} ${isInView ? styles.visible : ''}`}>
            <div className={styles.featuredBadge}>
              <span className={styles.badgeIcon}>📖</span>
              <span>{featuredArticle.category}</span>
            </div>

            <h3 className={styles.featuredTitle}>{featuredArticle.title}</h3>
            <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>

            <div className={styles.featuredMeta}>
              <span>{featuredArticle.date}</span>
              <span>•</span>
              <span>{featuredArticle.readTime}</span>
            </div>

            <a
              href={featuredArticle.url}
              className={styles.featuredLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Story →
            </a>
          </article>
        )}

        {/* Regular Articles Grid */}
        <div className={styles.articlesGrid}>
          {regularArticles.map((article, index) => (
            <article
              key={article.id}
              className={`${styles.articleCard} ${isInView ? styles.visible : ''}`}
              style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
            >
              <div className={styles.articleCategory}>{article.category}</div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>

              <div className={styles.articleMeta}>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <a
                href={article.url}
                className={styles.articleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className={styles.viewAllWrapper}>
          <a href="#" className={styles.viewAllLink}>
            Explore All Journal Entries →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Journal
