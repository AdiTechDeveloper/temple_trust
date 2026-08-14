import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPujas } from "../services/templeService";
import PujaCard from "../components/puja/PujaCard";
import bannerImg from "../assets/images/temple/pooja-booking.png";
import "./PujaBooking.css";

export default function PujaBooking() {
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const data = await getPujas();

        setPujas(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load pujas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPujas();
  }, []);

  return (
    <>
      <section
        className="page-banner"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <div className="page-banner-overlay" />

        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="eyebrow"
              style={{
                color: "var(--gold-light)",
              }}
            >
              ONLINE PUJA BOOKING
            </span>

            <h1
              className="section-heading"
              style={{
                color: "var(--text-on-navy)",
              }}
            >
              Book Sacred Pujas & Receive Divine Blessings
            </h1>

            <p
              style={{
                color: "rgba(244,239,225,0.82)",
                maxWidth: 560,
              }}
            >
              Choose from a variety of traditional pujas and rituals performed
              at our temple. Whether for health, prosperity, family well-being,
              or special occasions, every puja is conducted with devotion
              according to Vedic traditions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          {loading && (
            <div className="text-center py-5">
              <p>Loading Pujas...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-5">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && pujas.length === 0 && (
            <div className="text-center py-5">
              <p>No pujas are currently available.</p>
            </div>
          )}

          {!loading && !error && pujas.length > 0 && (
            <div className="puja-list-grid">
              {pujas.map((puja, i) => (
                <PujaCard key={puja.id} puja={puja} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
