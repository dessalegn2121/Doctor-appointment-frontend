import { Link } from "react-router-dom";

// Card used in doctors listing to show key doctor info and actions
const DoctorCard = ({ doctor }) => {
  return (
    <article className="doctor-card">
      <div className="doctor-card-header">
        <div className="doctor-avatar">
          {doctor.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className=""
            />
          ) : (
            <span>{doctor.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialization">
            {doctor.specialization}
          </p>
          <p className="doctor-hospital">{doctor.hospital}</p>
        </div>
      </div>

      <div className="doctor-meta">
        <p>
          Experience:{" "}
          <span className="badge-soft">
            {doctor.experience} years
          </span>
        </p>
        <p>
          Consultation Fee:{" "}
          <span className="badge-soft">
            {doctor.consultationFee} ETB
          </span>
        </p>
        <p>
          Available:{" "}
          {Array.isArray(doctor.availableDays)
            ? doctor.availableDays.join(", ")
            : "N/A"}
        </p>
      </div>

      <div className="doctor-actions">
        <Link
          to={`/doctors/${doctor._id}`}
          className="btn btn-outline btn-sm"
        >
          View Profile
        </Link>
        <Link
          to={`/book/${doctor._id}`}
          className="btn btn-primary btn-sm"
        >
          Book Appointment
        </Link>
      </div>
    </article>
  );
};

export default DoctorCard;

