import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gaushalaBanner from "../assets/images/home/gaushala.avif";
import gaushalaAbout from "../assets/images/gaushala/cow-1.jpg";
import cow1 from "../assets/images/gaushala/cow-2.jpg";
import cow2 from "../assets/images/gaushala/cow-3.jpg";
import cow3 from "../assets/images/gaushala/cow-4.jpg";
import cow4 from "../assets/images/gaushala/cow-5.jpg";
import {
  getGaushalaStats,
  getCowSponsorshipPlans,
} from "../services/templeService";
import { ROUTE_PATHS } from "../routes/routePaths";
import SectionHeading from "../components/common/SectionHeading";
import { FiArrowRight } from "react-icons/fi";
import InlineStatsRow from "../components/common/InlineStatsRow";
import "./Gaushala.css";

const cowGalleryImages = [cow1, cow2, cow3, cow4];

export default function Gaushala() {
  const [stats, setStats] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getGaushalaStats().then(setStats);
    getCowSponsorshipPlans().then(setPlans);
  }, []);

  return (
    <>
      <section
        className="page-banner"
        style={{ backgroundImage: `url(${gaushalaBanner})` }}
      >
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Seva in Action
            </span>
            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              Gaushala
            </h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Home to 240+ rescued and cared-for cows — a living expression of
              the trust's commitment to all beings.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl about-grid">
          <motion.img
            src={gaushalaAbout}
            alt="About the gaushala"
            className="about-portrait"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">About the Gaushala</span>
            <h2 className="section-heading">Care Rooted in Reverence</h2>
            <p style={{ marginBottom: 16 }}>
              Established in 2005 with just 12 rescued cows, the gaushala has
              grown into a full sanctuary caring for over 240 cows — many
              rescued from neglect, abandonment or slaughter. Each cow receives
              daily fodder, clean water, veterinary care and shelter.
            </p>
            <p style={{ marginBottom: 24 }}>
              Our mission extends beyond shelter: we believe in giving these
              animals dignity, comfort and a lifetime of care, supported
              entirely by the generosity of devotees like you.
            </p>
            <InlineStatsRow stats={stats} />
          </motion.div>
        </div>
      </section>

      {/* Cow Gallery */}
      <section className="section cow-gallery-section">
        <div className="container-xl">
          <SectionHeading eyebrow="Meet Them" title="Cow Gallery" />
          <div className="cow-gallery-grid">
            {cowGalleryImages.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Gaushala cow ${i + 1}`}
                className="cow-gallery-img"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: 40 , marginBottom: 40}}>
        <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-primary-gold">
          View All Donation Categories  <FiArrowRight />
        </Link>
      </div>

      {/* Sponsorship plans */}
      {/* <section className="section">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Get Involved"
            title="Adopt, Feed & Support"
            subtitle="Choose how you'd like to contribute to the wellbeing of our cows."
          />
          <div className="sponsorship-grid">
            {plans.map((plan, i) => (
              <SponsorshipCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Volunteer CTA */}
      {/* <section className="section gaushala-cta">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <GiCow size={40} color="var(--gold)" style={{ marginBottom: 16 }} />
          <h2
            className="section-heading"
            style={{ color: "var(--text-on-navy)" }}
          >
            Volunteer at the Gaushala
          </h2>
          <p
            style={{
              color: "rgba(244,239,225,0.8)",
              maxWidth: 520,
              margin: "0 auto 28px",
            }}
          >
            Spend a morning feeding and caring for our cows — a peaceful,
            grounding experience open to all devotees.
          </p>
          <Link
            to={ROUTE_PATHS.VOLUNTEER}
            className="btn-temple btn-primary-gold"
          >
            <FiUsers /> Register as Volunteer
          </Link>
        </div>
      </section> */}
    </>
  );
}
