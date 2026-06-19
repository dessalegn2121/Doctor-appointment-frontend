const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <h3 className="footer-section-title">About Tepi General Hospital</h3>
            <p className="section-text">
              Tepi General Hospital provides trusted healthcare services and modern medical
              support for our community. Our specialists are dedicated to safe, compassionate,
              patient-centered care.
            </p>
          </div>

          <div>
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/doctors" className="footer-link">
                  Doctors
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-section-title">Services</h3>
            <ul className="footer-links">
              <li>Outpatient Consultation</li>
              <li>Emergency Care</li>
              <li>Specialist Clinics</li>
              <li>Laboratory &amp; Imaging</li>
            </ul>
          </div>

          <div>
            <h3 className="footer-section-title">Contact &amp; Follow</h3>
            <ul className="footer-links">
              <li>Location: Tepi, Ethiopia</li>
              <li>Phone: +251 900 000 000</li>
              <li>Email: tepi.hospital@email.com</li>
            </ul>
            <div className="footer-social">
              <a
                href="#"
                aria-label="Facebook"
                className="footer-social-icon"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="footer-social-icon"
              >
                t
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="footer-social-icon"
              >
                in
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Tepi General Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

