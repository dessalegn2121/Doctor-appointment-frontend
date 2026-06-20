import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api.jsx";
// Doctor details page: fetch a doctor and show profile + actions
const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const load = async () => {
            setError("");
            setLoading(true);
            try {
                const res = await api.get(`/doctors/${id}`);
                setDoctor(res.data);
            }
            catch (err) {
                setError(err.response?.data?.message || "Failed to fetch doctor.");
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);
    if (loading) {
        return <section className="loading-text">Loading doctor...</section>;
    }
    if (error) {
        return (<section className="doctor-profile">
        <div className="alert alert-error">
          {error}
        </div>
        <Link to="/doctors" className="btn btn-outline btn-sm">
          Back to Doctors
        </Link>
      </section>);
    }
    if (!doctor) {
        return <section className="empty-text">Doctor not found.</section>;
    }
    return (<section className="doctor-profile">
      <div className="doctor-profile-card">
        <div className="doctor-profile-header">
          <div className="doctor-profile-avatar">
            {doctor.profileImage ? (<img src={doctor.profileImage} alt={doctor.name} className=""/>) : (<span>{doctor.name?.charAt(0) || "D"}</span>)}
          </div>

          <div className="doctor-profile-main">
            <h2 className="doctor-profile-name">{doctor.name}</h2>
            <p className="doctor-profile-specialization">{doctor.specialization}</p>
            {doctor.hospital && <p className="doctor-profile-hospital">{doctor.hospital}</p>}

            <dl className="doctor-profile-details">
              <div className="doctor-profile-detail-card">
                <dt className="doctor-profile-detail-label">Experience</dt>
                <dd className="doctor-profile-detail-value">
                  {doctor.experience ?? "N/A"} years
                </dd>
              </div>
              <div className="doctor-profile-detail-card">
                <dt className="doctor-profile-detail-label">Consultation Fee</dt>
                <dd className="doctor-profile-detail-value">
                  {doctor.consultationFee ?? "N/A"} ETB
                </dd>
              </div>
              <div className="doctor-profile-detail-card">
                <dt className="doctor-profile-detail-label">Available Days</dt>
                <dd className="doctor-profile-detail-value">
                  {Array.isArray(doctor.availableDays) ? doctor.availableDays.join(", ") : "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="doctor-profile-actions">
          <Link to={`/book/${doctor._id}`} className="btn btn-primary">
            Book Appointment
          </Link>
          <Link to="/doctors" className="btn btn-outline">
            Back to Doctors
          </Link>
        </div>
      </div>
    </section>);
};
export default DoctorProfile;
