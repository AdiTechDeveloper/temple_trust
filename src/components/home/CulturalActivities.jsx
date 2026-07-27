import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { GiMeditation, GiMusicalNotes, GiBookCover } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import "./CulturalActivities.css";

const activities = [
  { icon: <GiMusicalNotes />, title: "Bhajan Sandhya", description: "Weekly evenings of devotional music" },
  { icon: <GiMeditation />, title: "Yoga & Meditation", description: "Guided sessions for mind and body" },
  { icon: <GiBookCover />, title: "Sanskrit & Vedic Classes", description: "Traditional learning for all ages" },
  { icon: <FiUsers />, title: "Community Programs", description: "For youth, women and senior citizens" },
];

export default function CulturalActivities() {
  return (
    <section className="section cultural-activities">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Beyond Ritual"
          title="Cultural & Spiritual Activities"
          subtitle="The trust runs regular programs that nurture mind, body and community spirit throughout the year."
        />
        <div className="activities-grid">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              className="activity-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="activity-icon">{a.icon}</span>
              <h4>{a.title}</h4>
              <p>{a.description}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link to={ROUTE_PATHS.CULTURAL_ACTIVITIES} className="btn-temple btn-navy-outline">
            Explore All Programs <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
