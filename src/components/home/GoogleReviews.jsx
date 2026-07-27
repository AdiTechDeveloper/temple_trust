import { motion } from "framer-motion";
import { FiStar, FiExternalLink } from "react-icons/fi";
import "./GoogleReviews.css";

export default function GoogleReviews() {
  return (
    <section className="google-reviews-strip">
      <div className="container-xl">
        <motion.div
          className="google-reviews-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="gr-rating">
            <span className="gr-score">4.9</span>
            <div>
              <div className="gr-stars">
                {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <span className="gr-count">Based on 2,340+ Google Reviews</span>
            </div>
          </div>
          <a href="#" className="btn-temple btn-navy-outline" target="_blank" rel="noopener noreferrer">
            Read Reviews on Google <FiExternalLink />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
