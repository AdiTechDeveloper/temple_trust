import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import { getTestimonials } from "../../services/templeService";
import SectionHeading from "../common/SectionHeading";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="section testimonials-section">
      <div className="container-xl">
        <SectionHeading eyebrow="Devotee Voices" title="What Our Community Says" />
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          className="testimonial-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <span className="author-avatar">{t.name.charAt(0)}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
