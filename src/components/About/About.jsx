import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-wrapper">
          <div className="about__image-placeholder">
            <span className="about__placeholder-text">Portrait</span>
          </div>
        </div>

        <div className="about__content">
          <h2 className="about__heading">My Story</h2>
          <p className="about__text">
            I build digital spaces that feel alive—places where story breathes through every interaction.
            Drawing from nature's quiet wisdom and the craft of narrative, I help communities find their voice online.
            Each project is a conversation, a journey we take together toward something that thrives.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
