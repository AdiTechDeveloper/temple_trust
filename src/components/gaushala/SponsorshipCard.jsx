import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./SponsorshipCard.css";

export default function SponsorshipCard({ plan, index = 0 }) {
  return (
    <motion.div
      className="sponsorship-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <span className="sponsorship-price">₹{plan.price.toLocaleString("en-IN")}</span>
      <h4>{plan.title}</h4>
      <p>{plan.description}</p>
      <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-navy-outline sponsorship-btn">
        Contribute <FiArrowRight />
      </Link>
    </motion.div>
  );
}
