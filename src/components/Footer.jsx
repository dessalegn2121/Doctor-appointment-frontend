const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-400/35 bg-[radial-gradient(circle_at_12%_0%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_88%_20%,rgba(99,102,241,0.22),transparent_52%),linear-gradient(180deg,#0b1220_0%,#0b1020_55%,#070b14_100%)]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-11">
        <div className="grid grid-cols-1 gap-7 text-sm text-slate-200/80 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">About Tepi General Hospital</h3>
            <p className="mt-3 leading-6 text-slate-200/80">
              Tepi General Hospital provides trusted healthcare services and modern medical
              support for our community. Our specialists are dedicated to safe, compassionate,
              patient-centered care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-50">Quick Links</h3>
            <ul className="mt-3 space-y-1 text-slate-200/80">
              <li>
                <a href="/" className="inline-flex items-center gap-1 transition hover:translate-x-0.5 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/doctors" className="inline-flex items-center gap-1 transition hover:translate-x-0.5 hover:text-white">
                  Doctors
                </a>
              </li>
              <li>
                <a href="/about" className="inline-flex items-center gap-1 transition hover:translate-x-0.5 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="inline-flex items-center gap-1 transition hover:translate-x-0.5 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-50">Services</h3>
            <ul className="mt-3 space-y-1 text-slate-200/80">
              <li>Outpatient Consultation</li>
              <li>Emergency Care</li>
              <li>Specialist Clinics</li>
              <li>Laboratory &amp; Imaging</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-50">Contact &amp; Follow</h3>
            <ul className="mt-3 space-y-1 text-slate-200/80">
              <li>Location: Tepi, Ethiopia</li>
              <li>Phone: +251 900 000 000</li>
              <li>Email: tepi.hospital@email.com</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600/40 text-sm text-slate-200/80 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600/40 text-sm text-slate-200/80 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
              >
                t
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600/40 text-sm text-slate-200/80 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
              >
                in
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-slate-200/70">
          <p>&copy; {new Date().getFullYear()} Tepi General Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

