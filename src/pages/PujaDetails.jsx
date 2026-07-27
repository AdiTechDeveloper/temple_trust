import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiCheck, FiChevronRight, FiPackage } from "react-icons/fi";
import { getPujaBySlug } from "../services/templeService";
import { pujaImageMap } from "../utils/pujaImageMap";
import { ROUTE_PATHS } from "../routes/routePaths";
import PujaBookingForm from "../components/puja/PujaBookingForm";
import PageLoader from "../components/common/PageLoader";
import "./PujaDetails.css";

export default function PujaDetails() {
  const { slug } = useParams();
  const [puja, setPuja] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    setPuja(undefined);
    getPujaBySlug(slug).then(setPuja);
  }, [slug]);

  if (puja === undefined) return <PageLoader />;
  if (puja === null) return <Navigate to={ROUTE_PATHS.PUJA_BOOKING} replace />;

  return (
    <>
      <div className="puja-breadcrumb">
        <div className="container-xl">
          <Link to={ROUTE_PATHS.HOME}>Home</Link>
          <FiChevronRight size={13} />
          <Link to={ROUTE_PATHS.PUJA_BOOKING}>Puja Booking</Link>
          <FiChevronRight size={13} />
          <span>{puja.title}</span>
        </div>
      </div>

      <section className="section puja-details-section">
        <div className="container-xl puja-details-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <img src={pujaImageMap[puja.id]} alt={puja.title} className="puja-details-image" />

            <span className="eyebrow" style={{ marginTop: 28 }}>Puja Details</span>
            <h1 className="section-heading" style={{ fontSize: "2.1rem" }}>{puja.title}</h1>
            <div className="puja-meta-row">
              <span><FiClock size={14} /> Duration: <strong>{puja.duration}</strong></span>
              <span className="puja-meta-price">₹{puja.price.toLocaleString("en-IN")}</span>
            </div>
            <p style={{ margin: "20px 0 32px" }}>{puja.description}</p>

            <h3 className="puja-subheading">Benefits</h3>
            <ul className="puja-benefit-list">
              {puja.benefits.map((b) => (
                <li key={b}><FiCheck color="var(--gold)" /> {b}</li>
              ))}
            </ul>

            <h3 className="puja-subheading"><FiPackage size={16} /> Samagri Included</h3>
            <div className="puja-samagri-chips">
              {puja.samagri.map((s) => (
                <span key={s} className="samagri-chip">{s}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="puja-booking-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: 20 }}>
              Reserve This Puja
            </h3>
            <PujaBookingForm puja={puja} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
