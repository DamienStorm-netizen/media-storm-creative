import { useEffect, useRef, useState } from 'react'
import styles from './AmbientSound.module.css'

const AmbientSound = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  // Check localStorage for saved preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('ambientSoundEnabled')
    if (savedPreference === 'true' && audioRef.current) {
      // Small delay to respect browser autoplay policies
      setTimeout(() => {
        playAudio()
      }, 1000)
    }

    // Hide tooltip after 10 seconds (but keep button visible)
    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 10000)

    return () => clearTimeout(hideTooltipTimer)
  }, [])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0
      audioRef.current.play().then(() => {
        // Fade in
        fadeVolume(0, 0.3, 1500)
        setIsPlaying(true)
        localStorage.setItem('ambientSoundEnabled', 'true')
      }).catch((error) => {
        console.log('Audio autoplay prevented:', error)
      })
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      // Fade out
      fadeVolume(audioRef.current.volume, 0, 1000).then(() => {
        audioRef.current.pause()
        setIsPlaying(false)
        localStorage.setItem('ambientSoundEnabled', 'false')
      })
    }
  }

  const fadeVolume = (startVolume, endVolume, duration) => {
    return new Promise((resolve) => {
      const steps = 20
      const stepTime = duration / steps
      const volumeStep = (endVolume - startVolume) / steps
      let currentStep = 0

      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval)
          if (audioRef.current) {
            audioRef.current.volume = endVolume
          }
          resolve()
        } else {
          if (audioRef.current) {
            audioRef.current.volume = startVolume + (volumeStep * currentStep)
          }
          currentStep++
        }
      }, stepTime)
    })
  }

  const toggleSound = () => {
    setShowTooltip(false) // Hide tooltip when interacted with
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  return (
    <div className={styles.soundControl}>
      <button
        onClick={toggleSound}
        className={`${styles.toggleButton} ${isPlaying ? styles.playing : ''}`}
        aria-label={isPlaying ? 'Mute ambient sounds' : 'Play ambient sounds'}
        title={isPlaying ? 'Mute forest sounds' : 'Play forest sounds'}
      >
        {isPlaying ? (
          // Sound ON icon (waves)
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          // Sound OFF icon (muted)
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/forest-ambient.mp3" type="audio/mpeg" />
      </audio>

      {!isPlaying && showTooltip && (
        <span className={styles.tooltip}>Add ambient sounds</span>
      )}
    </div>
  )
}

export default AmbientSound
