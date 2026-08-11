import { motion } from "framer-motion";
import { FiDownload, FiCalendar, FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { replace, useNavigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import "./MembershipDashboard.css";
import { ROUTE_PATHS } from "../routes/routePaths";


import { Link } from "react-router-dom";


const donationHistory = [
  { id: "DN-1042", date: "2026-06-12", category: "Bhojanshala", amount: 2100, receipt: true },
  { id: "DN-0988", date: "2026-05-01", category: "Gaushala", amount: 1101, receipt: true },
  { id: "DN-0871", date: "2026-03-04", category: "General Donation", amount: 5100, receipt: true },
];



const pujaHistory = [
  { id: "PJ-221", puja: "Rudrabhishek", date: "2026-06-20", status: "Completed" },
  { id: "PJ-198", puja: "Satyanarayan Katha", date: "2026-04-15", status: "Completed" },
];

export default function MembershipDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate(ROUTE_PATHS.MEMBERSHIP_LOGIN, { replace: true });
  };


  return (
    <section className="section dashboard-section">
      <div className="container-xl">
        <div className="dashboard-header">
          <div className="dashboard-profile">
            {/* <span className="dashboard-avatar"><FiUser size={26} /></span> */}
            <div>
              <h2 style={{ fontSize: "1.6rem" }}>Welcome, {user?.name || "Devotee"}</h2>
              <p>{user?.email} · Member since {user?.memberSince}</p>
            </div>
              <Link to={ROUTE_PATHS.MEMBERSHIP_PROFILE} className="btn-temple btn-navy-outline">
          <FiUser /> Edit Profile
        </Link>
          </div>
          <button className="btn-temple btn-navy-outline" onClick={handleLogout}>
            <FiLogOut /> Sign Out
          </button>
          
        </div>
      
        {/* <motion.div
          className="membership-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mc-top">
            <span className="brand-mark">श्री</span>
            <span className="mc-trust-name">Sidhh Rudreshwar Seva Trust</span>
          </div>
          <div className="mc-body">
            <span className="mc-label">Member Name</span>
            <strong className="mc-value">{user?.name || "Devotee"}</strong>
            <div className="mc-row">
              <div>
                <span className="mc-label">Member Since</span>
                <strong className="mc-value">{user?.memberSince}</strong>
              </div>
              <div>
                <span className="mc-label">Membership ID</span>
                <strong className="mc-value">SRT-{(user?.email?.length || 4) * 137}</strong>
              </div>
            </div>
          </div>
        </motion.div> */}

        <SectionHeading align="left" eyebrow="History" title="Donation History" />
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr><th>Receipt ID</th><th>Date</th><th>Category</th><th>Amount</th><th></th></tr>
            </thead>
            <tbody>
              {donationHistory.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td>{d.category}</td>
                  <td>₹{d.amount.toLocaleString("en-IN")}</td>
                  <td>{d.receipt && <button className="table-link-btn"><FiDownload size={13} /> Receipt</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading align="left" eyebrow="History" title="Booked Pujas" />
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr><th>Booking ID</th><th>Puja</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {pujaHistory.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.puja}</td>
                  <td>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td><span className="status-pill">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-cta-row">
          <a href="/donation" className="btn-temple btn-primary-gold"><FiHeart /> Make a New Donation</a>
          <a href="/puja-booking" className="btn-temple btn-navy-outline"><FiCalendar /> Book Another Puja</a>
        </div>
      </div>
    </section>
  );
}
