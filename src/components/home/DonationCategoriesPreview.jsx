import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getDonationCategories } from "../../services/templeService";
import { donationIconMap } from "../../utils/donationIconMap";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import "./DonationCategoriesPreview.css";

export default function DonationCategoriesPreview() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getDonationCategories().then((data) => setCategories(data.slice(0, 8)));
  }, []);

  return (
    <section className="section donation-preview">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Give With Purpose"
          title="Choose a Cause Close to Your Heart"
          subtitle="Every category funds a specific need of the temple and its community — donate to what moves you, or give generally and let the trust allocate it where needed most."
        />
        <div className="donation-cat-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="donation-cat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <span className="donation-cat-icon">{donationIconMap[cat.icon]}</span>
              <h4>{cat.title}</h4>
              <p>{cat.description}</p>
              <Link to={ROUTE_PATHS.DONATION} className="donation-cat-link">
                Donate <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-primary-gold">
            View All Donation Categories <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
