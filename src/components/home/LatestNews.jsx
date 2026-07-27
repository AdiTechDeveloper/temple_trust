import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { getLatestNews } from "../../services/templeService";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import "./LatestNews.css";

const dateFmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function LatestNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getLatestNews().then(setNews);
  }, []);

  return (
    <section className="section news-section">
      <div className="container-xl">
        <SectionHeading eyebrow="Temple Updates" title="Latest News & Announcements" />
        <div className="news-grid">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              className="news-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="news-category">{item.category}</span>
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
              <div className="news-meta">
                <span><FiCalendar size={13} /> {dateFmt(item.date)}</span>
                <Link to={ROUTE_PATHS.NEWS}>Read More <FiArrowRight size={13} /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
