import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    story: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic will go here
    console.log('Form submitted:', formData)
  }

  return (
    <section className="contact">
      <div className="contact__background"></div>
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__heading">Let's Begin a Conversation</h2>
          <p className="contact__intro">
            Tell me where you are, what keeps you up, and the story you want your site to tell.
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__field-group">
            <label htmlFor="name" className="contact__label">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="contact__input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field-group">
            <label htmlFor="email" className="contact__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="contact__input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field-group">
            <label htmlFor="location" className="contact__label">Where Are You?</label>
            <input
              type="text"
              id="location"
              name="location"
              className="contact__input"
              placeholder="City, country, or wherever you call home"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="contact__field-group">
            <label htmlFor="story" className="contact__label">Your Story</label>
            <textarea
              id="story"
              name="story"
              className="contact__textarea"
              placeholder="What keeps you up at night? What story do you want to tell?"
              value={formData.story}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <button type="submit" className="contact__button">
            Begin Our Journey
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
