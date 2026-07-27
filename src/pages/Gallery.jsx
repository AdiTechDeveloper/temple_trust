import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiX } from "react-icons/fi";
import galleryBanner from "../assets/images/temple/sankalp.png";
import photo1 from "../assets/images/gallery/g1.png";
import photo2 from "../assets/images/gallery/g2.png";
import photo3 from "../assets/images/gallery/g3.png";
import photo4 from "../assets/images/gallery/g4.png";
import photo5 from "../assets/images/gallery/g5.jpeg";
import photo6 from "../assets/images/gallery/g6.jpeg";
import photo7 from "../assets/images/gallery/g7.jpeg";
import photo8 from "../assets/images/gallery/g8.jpeg";
import photo9 from "../assets/images/gallery/g9.jpeg";
import photo10 from "../assets/images/gallery/g10.jpeg";
import photo11 from "../assets/images/gallery/g11.jpeg";
import photo12 from "../assets/images/gallery/g12.jpeg";
import { fullGalleryData, galleryCategories } from "../data/fullGalleryData";
import "./Gallery.css";

const imageMap = {
  1: photo1,
  2: photo2,
  3: photo3,
  4: photo4,
  5: photo5,
  6: photo6,
  7: photo7,
  8: photo8,
  9: photo9,
  10: photo10,
  11: photo11,
  12: photo12,
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered =
    activeCategory === "All"
      ? fullGalleryData
      : fullGalleryData.filter((item) => item.category === activeCategory);

  return (
    <>
      <section
        className="page-banner"
        style={{ backgroundImage: `url(${galleryBanner})` }}
      >
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Moments Captured
            </span>
            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              Gallery
            </h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Photos from daily rituals, festivals, gaushala and bhojanshala
              activities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          <div className="gallery-filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="gallery-full-grid">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="gallery-full-item"
                  onClick={() => setLightboxItem(item)}
                >
                  <img src={imageMap[item.id]} alt={item.caption} />
                  <div className="gallery-full-overlay">
                    <FiZoomIn size={22} />
                    <span>{item.caption}</span>
                    <small>{item.category}</small>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <button className="lightbox-close" aria-label="Close">
              <FiX size={26} />
            </button>
            <motion.img
              src={imageMap[lightboxItem.id]}
              alt={lightboxItem.caption}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="lightbox-caption">
              {lightboxItem.caption} — {lightboxItem.category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
