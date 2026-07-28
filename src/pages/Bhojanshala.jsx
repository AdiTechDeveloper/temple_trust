import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import bhojanshalaBanner from "../assets/images/bhojanshala/bhojanshala-banner.png";
import bhojanshalaAbout from "../assets/images/bhojanshala/bhojanshala-about.jpg";
import kitchen1 from "../assets/images/bhojanshala/kitchen-1.jpeg";
import kitchen2 from "../assets/images/bhojanshala/kitchen-2.avif";
import kitchen3 from "../assets/images/bhojanshala/kitchen-3.avif";
import kitchen4 from "../assets/images/bhojanshala/kitchen-4.avif";
import { getBhojanshalaStats, getMealSponsorshipPlans } from "../services/templeService";
import { ROUTE_PATHS } from "../routes/routePaths";
import SectionHeading from "../components/common/SectionHeading";
import InlineStatsRow from "../components/common/InlineStatsRow";
import SponsorshipCard from "../components/gaushala/SponsorshipCard";
import "./Bhojanshala.css";

const kitchenImages = [kitchen1, kitchen2, kitchen3, kitchen4];

export default function Bhojanshala() {
  const [stats, setStats] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getBhojanshalaStats().then(setStats);
    getMealSponsorshipPlans().then(setPlans);
  }, []);

  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `url(${bhojanshalaBanner})` }}>
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>Annadan</span>
            <h1 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Bhojanshala</h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Our community kitchen serves over 1,800 meals daily — because feeding the hungry is a form of worship.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl about-grid">
          <motion.img
            src={bhojanshalaAbout} alt="About the bhojanshala" className="about-portrait"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          />
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow">Daily Meal Service</span>
            <h2 className="section-heading">A Kitchen That Never Turns Anyone Away</h2>
            <p style={{ marginBottom: 16 }}>
              For 18 years, our bhojanshala has served fresh, sattvic meals to devotees, the underprivileged
              and anyone in need — no questions asked. What began as a modest Annadan initiative now feeds
              thousands each month.
            </p>
            <p style={{ marginBottom: 24 }}>
              Every sponsorship — whether for a birthday, anniversary or general Annadan — directly funds
              ingredients, cooking staff and the operation of this kitchen.
            </p>
            <InlineStatsRow stats={stats} />
          </motion.div>
        </div>
      </section>

      {/* Kitchen gallery */}
      <section className="section kitchen-gallery-section">
        <div className="container-xl">
          <SectionHeading eyebrow="Behind the Scenes" title="Photo Gallery" />
          <div className="kitchen-gallery-grid">
            {kitchenImages.map((img, i) => (
              <motion.img
                key={i} src={img} alt={`Bhojanshala kitchen ${i + 1}`} className="kitchen-gallery-img"
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship plans */}
      <section className="section">
        <div className="container-xl">
          <SectionHeading eyebrow="Sponsor a Meal" title="Meal Sponsorship Options" subtitle="Mark a special occasion or simply give — every sponsorship feeds real people." />
          <div className="sponsorship-grid">
            {plans.map((plan, i) => <SponsorshipCard key={plan.id} plan={plan} index={i} />)}
          </div>
        </div>
      </section>

      {/* <section className="section bhojanshala-cta">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <GiMeal size={40} color="var(--gold)" style={{ marginBottom: 16 }} />
          <h2 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Volunteer in the Kitchen</h2>
          <p style={{ color: "rgba(244,239,225,0.8)", maxWidth: 520, margin: "0 auto 28px" }}>
            Help cook, serve or organize Annadan — kitchen volunteers are always welcome.
          </p>
          <Link to={ROUTE_PATHS.VOLUNTEER} className="btn-temple btn-primary-gold">
            <FiUsers /> Register as Volunteer
          </Link>
        </div>
      </section> */}
    </>
  );
}
