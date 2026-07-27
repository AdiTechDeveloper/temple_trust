import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import founderImg from "../assets/images/trustees/register.png";
import { ROUTE_PATHS } from "../routes/routePaths";
import "./AuthLayout.css";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="auth-page">
      <div className="auth-visual" style={{ backgroundImage: `url(${founderImg})` }}>
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link to={ROUTE_PATHS.HOME} className="auth-brand">
            {/* <span className="brand-mark">श्री</span>
            <span>Sidhh Rudreshwar Mahadev Temple Trust</span> */}
          </Link>
          <blockquote>
            "Membership connects you to the temple beyond a single visit — track your seva, your donations
            and your family's spiritual journey, all in one place."
          </blockquote>
        </div>
      </div>
      <div className="auth-form-side">
        <motion.div
          className="auth-form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Membership</span>
          <h1 className="section-heading" style={{ fontSize: "2rem", marginBottom: 8 }}>{title}</h1>
          <p style={{ marginBottom: 32 }}>{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
