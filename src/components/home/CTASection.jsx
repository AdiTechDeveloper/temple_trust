import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiUserPlus } from "react-icons/fi";
import ctaBanner from "../../assets/images/home/cta-banner.jpg";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SacredDivider from "../common/SacredDivider";
import "./CTASection.css";

export default function CTASection() {
  return (
    <section className="cta-section" style={{ backgroundImage: `url(${ctaBanner})` }}>
      <div className="cta-overlay" />
      <div className="container-xl cta-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SacredDivider />
          <h2 className="section-heading" style={{ color: "var(--text-on-navy)", marginTop: 20 }}>
            Your Seva Becomes Someone's Blessing
          </h2>
          <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560, margin: "0 auto 32px" }}>
            Whether through a donation, a puja booking, or your time as a volunteer — every contribution
            sustains this temple's service to the community.
          </p>
          <div className="cta-buttons">
            <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-primary-gold">
              <FiHeart /> Donate Now
            </Link>
            <Link to={ROUTE_PATHS.MEMBERSHIP_REGISTER} className="btn-temple btn-outline-light">
              <FiUserPlus /> Become a Member
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
