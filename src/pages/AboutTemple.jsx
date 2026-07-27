import { motion } from "framer-motion";
import { FiCheck, FiClock, FiMapPin } from "react-icons/fi";
import templeBanner from "../assets/images/temple/birthday.png";
import historyImg from "../assets/images/home/welcome.png";
import archImg from "../assets/images/temple/rudrabhishek.jpg";

import {
  templeRules,
  templeFaqs,
  architectureFacts,
} from "../data/templeDetailsData";
import { templeInfo } from "../data/templeInfo";
import SectionHeading from "../components/common/SectionHeading";
import FaqAccordion from "../components/temple/FaqAccordion";
import "./AboutTemple.css";

export default function AboutTemple() {
  return (
    <>
      <section
        className="page-banner"
        style={{ backgroundImage: `url(${templeBanner})` }}
      >
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Sacred Space
            </span>
            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              About the Temple
            </h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Discover the history, architecture and spiritual significance of
              Shree Sidhh Rudreshwar Mahadev Temple.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History & Significance */}
      <section className="section">
        <div className="container-xl about-grid">
          <motion.img
            src={historyImg}
            alt="Temple history"
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
            <span className="eyebrow">Temple History</span>
            <h2 className="section-heading">A Sanctum of Enduring Faith</h2>
            <p style={{ marginBottom: 16 }}>
              The temple is built around a swayambhu (self-manifested) Shivling,
              discovered on this land generations ago. Devotees have maintained
              an unbroken tradition of worship here, with the current structure
              completed in 1999 and expanded through subsequent renovations.
            </p>
            <p style={{ marginBottom: 16 }}>
              The temple holds deep spiritual significance for devotees seeking
              Mahadev's blessings for health, peace and the removal of obstacles
              — with Mahashivratri and every Shravan Somvar drawing thousands of
              pilgrims from across the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section architecture-section">
        <div className="container-xl about-grid reverse">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Architecture</span>
            <h2 className="section-heading">Nagara-Style Craftsmanship</h2>
            <p style={{ marginBottom: 24 }}>
              Every carving on the temple's shikhara and mandapa was hand-cut by
              traditional stone artisans, following classical Nagara
              architectural principles passed down through generations of temple
              builders.
            </p>
            <div className="arch-facts-grid">
              {architectureFacts.map((f) => (
                <div key={f.label} className="arch-fact">
                  <span className="arch-fact-label">{f.label}</span>
                  <strong>{f.value}</strong>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.img
            src={archImg}
            alt="Temple architecture"
            className="about-portrait-alt"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Rules & Timings */}
      <section className="section">
        <div className="container-xl rules-grid">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Please Note"
              title="Temple Rules"
            />
            <ul className="rules-list">
              {templeRules.map((rule) => (
                <li key={rule}>
                  <FiCheck color="var(--gold)" /> {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="timings-card">
            <h3>
              <FiClock /> Darshan Timings
            </h3>
            {templeInfo.darshanTimings.map((t) => (
              <div key={t.label} className="timings-row">
                <span>{t.label}</span>
                <strong>{t.time}</strong>
              </div>
            ))}
            <h3 style={{ marginTop: 24 }}>
              <FiMapPin /> How to Reach
            </h3>
            <p style={{ fontSize: "0.9rem" }}>
              {templeInfo.address.line1}, {templeInfo.address.line2}. Well
              connected by auto-rickshaw and city bus routes, with dedicated
              parking available on-site for private vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section faq-section">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently Asked Questions"
          />
          <FaqAccordion items={templeFaqs} />
        </div>
      </section>
    </>
  );
}
