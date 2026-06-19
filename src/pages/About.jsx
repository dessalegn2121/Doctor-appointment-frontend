const About = () => {
  return (
    <section className="about-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">About Tepi General Hospital</h2>
          <p className="page-subtitle">
            Tepi General Hospital provides trusted healthcare services and modern medical support
            for our community. Our dedicated team of specialists is committed to compassionate,
            patient-centered care.
          </p>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3 className="about-card-title">Tepi General Hospital Doctor Appointment System</h3>
          <p className="about-text">
            Book appointments with trusted doctors, manage your visits, and access quality care at
            Tepi General Hospital.
          </p>

          <div className="about-highlights">
            <div className="about-highlight">
              <div className="about-highlight-title">Online Appointment Booking</div>
              <div className="about-highlight-text">Search doctors by specialization</div>
            </div>
            <div className="about-highlight">
              <div className="about-highlight-title">Manage your visits</div>
              <div className="about-highlight-text">Book and manage your appointments</div>
            </div>
            <div className="about-highlight">
              <div className="about-highlight-title">History & access</div>
              <div className="about-highlight-text">View appointment history from your dashboard</div>
            </div>
          </div>

          <div className="about-contact">
            <div className="about-contact-title">Contact Information</div>
            <ul className="about-contact-list">
              <li>Location: Tepi, Ethiopia</li>
              <li>Phone: +251 900 000 000</li>
              <li>Email: tepi.hospital@email.com</li>
            </ul>
          </div>
        </div>

        <div className="about-map-card">
          <h3 className="about-card-title">Find us on the map</h3>
          <p className="about-text">
            Location: Tepi, Ethiopia
          </p>
          <div className="map-embed map-embed-lg">
            <iframe
              title="Tepi, Ethiopia map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Tepi%2C%20Ethiopia&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

