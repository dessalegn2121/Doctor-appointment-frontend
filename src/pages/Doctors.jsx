import { useEffect, useState } from "react";
import api from "../services/api.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
// Doctors listing page with search by specialization and responsive grid
const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchDoctors = async (specialization) => {
        setLoading(true);
        try {
            const res = await api.get("/doctors", {
                params: specialization ? { specialization } : {},
            });
            setDoctors(res.data.doctors || []);
        }
        catch (error) {
            console.error("Failed to load doctors", error);
            setDoctors([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        fetchDoctors(search);
    };
    return (<section className="doctors-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Our Doctors</h2>
          <p className="page-subtitle">
            Search and book appointments with specialists at Tepi General Hospital.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search by specialization (e.g. Cardiology)" value={search} onChange={(e) => setSearch(e.target.value)} className="input-rounded"/>
          <button className="btn btn-primary btn-sm" type="submit">
            Search
          </button>
        </form>
      </div>

      {loading ? (<p className="loading-text">Loading doctors...</p>) : (<>
          <div className="doctors-grid">
            {doctors.map((d) => (<DoctorCard key={d._id} doctor={d}/>))}
          </div>
          {!loading && doctors.length === 0 && (<p className="empty-text">
              No doctors found. Try a different specialization.
            </p>)}
        </>)}
    </section>);
};
export default Doctors;
