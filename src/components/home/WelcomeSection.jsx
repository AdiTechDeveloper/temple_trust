import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import welcomeImage from "../../assets/images/home/welcome.png";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./WelcomeSection.css";

export default function WelcomeSection() {
  return (
    <section className="section welcome-section">
      <div className="container-xl welcome-grid">
        <motion.div
          className="welcome-image-wrap"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <img src={welcomeImage} alt="Sanctum of Shree Sidhh Rudreshwar Mahadev Temple" className="welcome-image" />
          <div className="welcome-badge">
            <strong>27+</strong>
            <span>Years of Uninterrupted Seva</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="eyebrow">Welcome</span>
          <h2 className="section-heading">Where Devotion Inspires Service,and Service Strengthens Society</h2>
          <p style={{ marginBottom: 18 }}>
            For years, Shree Sidhh Rudreshwar Mahadev Temple & Trust has been a center of faith, spirituality, and selfless service. Beyond daily worship and sacred rituals, the trust is dedicated to uplifting the community through meaningful charitable initiatives.
          </p>
          <p style={{ marginBottom: 30 }}>
            From Darshan, Puja Booking, and Live Darshan to Annadan (Bhojanalay), Gaushala Seva, Festival Celebrations, Donation Programs, and Community Welfare Activities, every effort is guided by the values of compassion, devotion, and humanity.
          </p>
          <Link to={ROUTE_PATHS.ABOUT_TRUST} className="btn-temple btn-navy-outline">
            Discover Our Journey <FiArrowUpRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
