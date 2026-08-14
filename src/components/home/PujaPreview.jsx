import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { getPujas } from "../../services/templeService";
import { ROUTE_PATHS, pujaDetailsPath } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import "./PujaPreview.css";

export default function PujaPreview() {
  const [pujas, setPujas] = useState([]);

  useEffect(() => {
    getPujas().then((data) => setPujas(data.slice(0, 4)));
  }, []);

  return (
    <section className="section puja-preview">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Sacred Rituals"
          title="Book a Puja, Performed With Precision"
          subtitle="Each ritual is conducted by experienced priests following traditional Vedic procedure — book online and receive a recording of your puja."
        />
        <div className="puja-grid">
          {pujas.map((puja, i) => (
            <motion.div
              key={puja.id}
              className="puja-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="puja-card-top">
                <span className="puja-duration"><FiClock size={13} /> {puja.duration} Hours</span>
                <span className="puja-price">₹{puja.price.toLocaleString("en-IN")}</span>
              </div>
              <h4>{puja.name}</h4>
              <p>{puja.short_description}</p>
              <Link to={pujaDetailsPath(puja.id)} className="btn-temple btn-navy-outline puja-book-btn">
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to={ROUTE_PATHS.PUJA_BOOKING} className="btn-temple btn-primary-gold">
            View All Pujas <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
