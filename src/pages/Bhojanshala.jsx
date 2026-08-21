import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bhojanshalaBanner from "../assets/images/bhojanshala/bhojanshala-banner.png";
import bhojanshalaAbout from "../assets/images/bhojanshala/bhojanshala-about.jpg";
import kitchen1 from "../assets/images/bhojanshala/kitchen-1.jpeg";
import kitchen2 from "../assets/images/bhojanshala/kitchen-2.avif";
import kitchen3 from "../assets/images/bhojanshala/kitchen-3.avif";
import kitchen4 from "../assets/images/bhojanshala/kitchen-4.avif";
import { ROUTE_PATHS } from "../routes/routePaths";
import {
  getBhojanshalaStats,
  getMealSponsorshipPlans,
} from "../services/templeService";
import SectionHeading from "../components/common/SectionHeading";
import InlineStatsRow from "../components/common/InlineStatsRow";
import { FiArrowRight } from "react-icons/fi";

import SponsorshipCard from "../components/gaushala/SponsorshipCard";
import "./Bhojanshala.css";

const kitchenImages = [
  { src: kitchen1, alt: "Preparation room in Bhojanshala kitchen" },
  { src: kitchen2, alt: "Large cooking vessels for Annadan meal service" },
  { src: kitchen3, alt: "Volunteers serving hot sattvic meals" },
  { src: kitchen4, alt: "Clean dining facility for devotees" },
];

export default function Bhojanshala() {
  const [stats, setStats] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getBhojanshalaStats(), getMealSponsorshipPlans()])
      .then(([statsData, plansData]) => {
        if (isMounted) {
          setStats(statsData || []);
          setPlans(plansData || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load Bhojanshala data:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bhojanshala-page">
      {/* Hero Banner Section */}
      <section
        className="page-banner"
        style={{ backgroundImage: `url(${bhojanshalaBanner})` }}
      >
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Annadan
            </span>
            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              Bhojanshala
            </h1>
            <p className="page-banner-desc">
              Our community kitchen serves over 1,800 meals daily — because
              feeding the hungry is a form of worship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bhojanshala-about-section">
        <div className="container-xl about-grid">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={bhojanshalaAbout}
              alt="About the Bhojanshala kitchen and dining service"
              className="about-portrait"
            />
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Daily Meal Service</span>
            <h2 className="section-heading">
              A Kitchen That Never Turns Anyone Away
            </h2>
            <p className="about-text">
              For 18 years, our bhojanshala has served fresh, sattvic meals to
              devotees, the underprivileged, and anyone in need — no questions
              asked. What began as a modest Annadan initiative now feeds
              thousands each month.
            </p>
            <p className="about-text highlight">
              Every sponsorship — whether for a birthday, anniversary, or
              general Annadan — directly funds ingredients, cooking staff, and
              the daily operations of this kitchen.
            </p>

            {/* Stats Row */}
            <InlineStatsRow stats={stats} />
          </motion.div>
        </div>
      </section>

      {/* Kitchen Photo Gallery */}
      <section className="section kitchen-gallery-section">
        <div className="container-xl">
          <SectionHeading eyebrow="Behind the Scenes" title="Photo Gallery" />
          <div className="kitchen-gallery-grid">
            {kitchenImages.map((img, i) => (
              <motion.div
                key={i}
                className="kitchen-gallery-img-wrapper"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="kitchen-gallery-img"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: 40, marginBottom: 40 }}>
        <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-primary-gold">
          View All Donation Categories <FiArrowRight />
        </Link>
      </div>

      {/* Sponsorship Plans Section */}
      {/* <section className="section bhojanshala-sponsorship-section">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Sponsor a Meal"
            title="Meal Sponsorship Options"
            subtitle="Mark a special occasion or simply give — every sponsorship feeds real people."
          />

          {loading ? (
            <div className="sponsorship-loading">Loading plans...</div>
          ) : (
            <div className="sponsorship-grid">
              {plans.map((plan, i) => (
                <SponsorshipCard key={plan.id || i} plan={plan} index={i} />
              ))}
            </div>
          )}
        </div>
      </section> */}
    </div>
  );
}
