import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ROUTE_PATHS } from "../../routes/routePaths";
import heroOne from "../../assets/images/home/hero-1.png";
import heroTwo from "../../assets/images/home/hero-2.png";
import heroThree from "../../assets/images/home/hero-3.png";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./HeroSlider.css";

const slides = [
  { image: heroOne, eyebrow: "Welcome to", title: "Shree Rudreshwar Seva Sanstha & Charitable Trust", sub: "A sanctuary of devotion, service and community — open to every soul seeking Mahadev's blessings." },
  { image: heroTwo, eyebrow: "Daily Darshan", title: "Experience the Divine Blessings of Lord Shiva", sub: "Join Mangala Aarti, Rudrabhishek and daily darshan from anywhere in the world." },
  { image: heroThree, eyebrow: "Seva Beyond the Sanctum", title: "Annadan – The Greatest Service", sub: "Every meal served spreads compassion, dignity and blessings." },
];

export default function HeroSlider() {
  return (
    <section className="hero-slider">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="hero-overlay" />
              <div className="container-xl hero-content">
                <motion.span
                  className="eyebrow"
                  style={{ color: "var(--gold-light)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {slide.eyebrow}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="hero-title"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.32 }}
                  className="hero-sub"
                >
                  {slide.sub}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.44 }}
                  className="hero-ctas"
                >
                  <Link to={ROUTE_PATHS.DONATION} className="btn-temple btn-primary-gold">
                    <FiHeart /> Donate Now
                  </Link>
                  <Link to={ROUTE_PATHS.PUJA_BOOKING} className="btn-temple btn-outline-light">
                    <FiCalendar /> Book a Puja
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hero-arrow hero-prev" aria-label="Previous slide"><FiChevronLeft /></button>
      <button className="hero-arrow hero-next" aria-label="Next slide"><FiChevronRight /></button>
    </section>
  );
}
