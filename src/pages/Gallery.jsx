import { useEffect, useState } from "react";
import { getGallery } from "../services/templeservice";
import { motion } from "framer-motion";

import galleryBanner from "../assets/images/temple/sankalp.png";

import "./Gallery.css";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();

        console.log("Gallery Data:", data);

        setGallery(data);
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Get unique categories from database data
  const categories = [
    "All",
    ...new Set(
      gallery
        .map((item) => item.category)
        .filter((category) => category)
    ),
  ];

  // Filter images according to selected category
  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            item.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <>
      {/* ================= Banner ================= */}
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
            <span
              className="eyebrow"
              style={{ color: "var(--gold-light)" }}
            >
              Moments Captured
            </span>

            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              Gallery
            </h1>

            <p
              style={{
                color: "rgba(244,239,225,0.82)",
                maxWidth: 560,
              }}
            >
              Photos from daily rituals, festivals, gaushala and
              bhojanshala activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= Gallery ================= */}
      <section className="gallery-section">

        {loading ? (
          <div className="text-center py-5">
            <p>Loading gallery...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-5">
            <p>No gallery images available.</p>
          </div>
        ) : (
          <>
            {/* ================= Category Tabs ================= */}
            <div className="gallery-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`gallery-tab ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* ================= Gallery Grid ================= */}
            {filteredGallery.length === 0 ? (
              <div className="text-center py-5">
                <p>No images available in this category.</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {filteredGallery.map((item) => (
                  <motion.div
                    className="gallery-card"
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="gallery-image">
                      <img
                        src={item.image_url}
                        alt={item.title || "Gallery Image"}
                      />
                    </div>
{/* 
                    <div className="gallery-content">
                      <span className="gallery-category">
                        {item.category}
                      </span>

                      <h5>{item.title}</h5>
                    </div> */}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}