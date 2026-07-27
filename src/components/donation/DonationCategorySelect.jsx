import { motion } from "framer-motion";
import { donationIconMap } from "../../utils/donationIconMap";
import "./DonationCategorySelect.css";

export default function DonationCategorySelect({ categories, selectedId, onSelect }) {
  return (
    <div className="donation-cat-select-grid">
      {categories.map((cat, i) => (
        <motion.button
          type="button"
          key={cat.id}
          className={`donation-cat-select-card ${selectedId === cat.id ? "is-selected" : ""}`}
          onClick={() => onSelect(cat.id)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
        >
          <span className="donation-cat-select-icon">{donationIconMap[cat.icon]}</span>
          <span className="donation-cat-select-title">{cat.title}</span>
        </motion.button>
      ))}
    </div>
  );
}
