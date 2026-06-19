import { Link } from "react-router-dom";

// Landing page with hero, features, and mission/ services overview
const Home = () => {
  return (
    <section className="home-page">
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-content">
          <p className="hero-kicker">
            Tepi, Ethiopia · 24/7 Emergency Support
          </p>
          <h1 className="hero-title">
            Welcome to Tepi General Hospital
          </h1>
          <p className="hero-text">
            Book appointments with trusted specialists, manage your visits, and access safe,
            patient-centered care from anywhere.
          </p>
          <div className="hero-actions">
            <Link
              to="/doctors"
              className="btn btn-primary"
            >
              Find a Doctor
            </Link>
            <Link
              to="/login"
              className="btn btn-outline"
            >
              Patient Login
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost"
            >
              About
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h2 className="hero-card-title">
            Online Appointment Booking
          </h2>
          <p className="hero-card-text">
            Manage your care from your phone or laptop with a few simple steps.
          </p>
          <ul className="hero-card-list">
            <li className="hero-card-item">
              <span className="hero-dot" />
              <span>Search doctors by specialization and availability.</span>
            </li>
            <li className="hero-card-item">
              <span className="hero-dot" />
              <span>Book and manage appointments in a personal dashboard.</span>
            </li>
            <li className="hero-card-item">
              <span className="hero-dot" />
              <span>View visit and appointment history at any time.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mission & services */}
      <div className="home-mission-grid">
        <div className="section-card">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            Our mission is to deliver accessible, high‑quality healthcare for the Tepi
            community. We combine experienced medical professionals with modern facilities
            to provide safe diagnosis, treatment, and follow‑up care.
          </p>
        </div>
        <div className="section-card">
          <h2 className="section-title">Hospital Services</h2>
          <dl className="section-services-grid">
            <div>
              <dt className="section-services-term">Outpatient Consultation</dt>
              <dd className="section-services-desc">
                Daily clinics with experienced general practitioners and specialists.
              </dd>
            </div>
            <div>
              <dt className="section-services-term">Emergency Care</dt>
              <dd className="section-services-desc">
                24/7 emergency and triage services for urgent conditions.
              </dd>
            </div>
            <div>
              <dt className="section-services-term">Specialist Clinics</dt>
              <dd className="section-services-desc">
                Cardiology, pediatrics, obstetrics, surgery, and more.
              </dd>
            </div>
            <div>
              <dt className="section-services-term">Laboratory &amp; Imaging</dt>
              <dd className="section-services-desc">
                Modern lab tests and imaging services to support accurate diagnosis.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* About */}
      <div className="section-card">
        <h2 className="section-title">About Tepi General Hospital</h2>
        <p className="section-text">
          Tepi General Hospital provides trusted healthcare services and modern medical support
          for our community. Our dedicated team of specialists is committed to compassionate,
          patient-centered care.
        </p>
        <div style={{ marginTop: "0.9rem" }}>
          <Link to="/about" className="btn btn-outline">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

