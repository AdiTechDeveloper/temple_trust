import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import festivalBanner from "../../assets/images/home/festival-banner.jpg";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./FestivalBanner.css";

export default function FestivalBanner() {
  return (
    <section className="festival-banner" style={{ backgroundImage: `url(${festivalBanner})` }}>
      <div className="festival-overlay" />
      <div className="container-xl festival-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>Upcoming Celebration</span>
          <h2 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Mahashivratri Mahotsav</h2>
          <p style={{ color: "rgba(244,239,225,0.8)", maxWidth: 500, marginBottom: 28 }}>
            Join us for an all-night celebration of Rudrabhishek, continuous bhajans and the grand midnight aarti.
          </p>
          <Link to={ROUTE_PATHS.EVENTS} className="btn-temple btn-primary-gold">
            View Festival Details <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
