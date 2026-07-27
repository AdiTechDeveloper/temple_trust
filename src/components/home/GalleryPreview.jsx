import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZoomIn } from "react-icons/fi";
import { getHomeGalleryPreview } from "../../services/templeService";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import gallery1 from "../../assets/images/home/gallery-1.jpg";
import gallery2 from "../../assets/images/home/gallery-2.jpg";
import gallery3 from "../../assets/images/home/gallery-3.jpg";
import gallery4 from "../../assets/images/home/gallery-4.jpg";
import gallery5 from "../../assets/images/home/gallery-5.jpg";
import gallery6 from "../../assets/images/home/gallery-6.jpg";
import "./GalleryPreview.css";

const imageMap = { 1: gallery1, 2: gallery2, 3: gallery3, 4: gallery4, 5: gallery5, 6: gallery6 };

export default function GalleryPreview() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getHomeGalleryPreview().then(setItems);
  }, []);

  return (
    <section className="section gallery-preview">
      <div className="container-xl">
        <SectionHeading eyebrow="Moments" title="Photo Gallery" subtitle="Glimpses of daily rituals, festivals and seva activities across the trust." />
        <div className="gallery-preview-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-preview-item"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <img src={imageMap[item.id]} alt={item.caption} />
              <div className="gallery-preview-overlay">
                <FiZoomIn size={22} />
                <span>{item.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to={ROUTE_PATHS.GALLERY} className="btn-temple btn-navy-outline">
            View Full Gallery <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
