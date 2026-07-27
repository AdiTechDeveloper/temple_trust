import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { useState } from "react";
import videoPoster from "../../assets/images/home/video-poster.jpg";
import SectionHeading from "../common/SectionHeading";
import "./VideoGallery.css";

export default function VideoGallery() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section video-gallery-section">
      <div className="container-xl">
        <SectionHeading eyebrow="Watch" title="Experience the Temple in Motion" subtitle="A short film capturing the daily rhythm of aarti, seva and celebration at the temple." />
        <motion.div
          className="video-frame"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {!playing ? (
            <button className="video-play-btn" onClick={() => setPlaying(true)} aria-label="Play temple video">
              <img src={videoPoster} alt="Temple video preview" />
              <span className="play-icon"><FiPlay size={28} /></span>
            </button>
          ) : (
            <div className="video-placeholder-note">
              Video streaming will be connected once the trust's official video is provided.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
