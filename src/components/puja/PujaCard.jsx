import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { pujaImageMap } from "../../utils/pujaImageMap";
import { pujaDetailsPath } from "../../routes/routePaths";
import "./PujaCard.css";

export default function PujaCard({ puja, index = 0 }) {
  return (
    <motion.div
      className="puja-list-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <div className="puja-list-image">
        <img src={pujaImageMap[puja.id]} alt={puja.title} />
        <span className="puja-list-price">₹{puja.price.toLocaleString("en-IN")}</span>
      </div>
      <div className="puja-list-body">
        <h4>{puja.title}</h4>
        <p>{puja.description}</p>
        <div className="puja-list-footer">
          <span className="puja-list-duration"><FiClock size={13} /> {puja.duration}</span>
          <Link to={pujaDetailsPath(puja.id)} className="puja-list-link">
            View Details <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
