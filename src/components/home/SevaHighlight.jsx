import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { GiCow, GiMeal } from "react-icons/gi";
import gaushalaImg from "../../assets/images/home/gaushala.avif";
import bhojanshalaImg from "../../assets/images/home/bhojanshala.jpeg";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./SevaHighlight.css";

const cards = [
  {
    image: gaushalaImg,
    icon: <GiCow />,
    title: "Gaushala",
    description: "Home to 240+ cows, cared for daily with fodder, medical attention and love. Adopt or sponsor a cow's care.",
    path: ROUTE_PATHS.GAUSHALA,
    cta: "Visit Gaushala",
  },
  {
    image: bhojanshalaImg,
    icon: <GiMeal />,
    title: "Bhojanshala",
    description: "A community kitchen serving 52,000+ meals a month through Annadan. Sponsor a meal in someone's honor.",
    path: ROUTE_PATHS.BHOJANSHALA,
    cta: "Visit Bhojanshala",
  },
];

export default function SevaHighlight() {
  return (
    <section className="section seva-highlight">
      <div className="container-xl seva-grid">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="seva-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div className="seva-card-image">
              <img src={card.image} alt={card.title} />
              <span className="seva-icon-badge">{card.icon}</span>
            </div>
            <div className="seva-card-body">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link to={card.path} className="btn-temple btn-navy-outline">
                {card.cta} <FiArrowUpRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
