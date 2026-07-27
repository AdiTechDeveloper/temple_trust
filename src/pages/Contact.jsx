import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { templeInfo } from "../data/templeInfo";
import donationBanner from "../assets/images/home/contact_banner.png";
import FeedbackForm from "../components/contact/FeedbackForm";
import "./Contact.css";

const contactCards = [
  {
    icon: <FiMapPin />,
    title: "Visit Us",
    lines: [templeInfo.address.line1, templeInfo.address.line2],
  },
  {
    icon: <FiPhone />,
    title: "Call Us",
    lines: [templeInfo.address.phone],
    href: `tel:${templeInfo.address.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <FiMail />,
    title: "Email Us",
    lines: [templeInfo.address.email],
    href: `mailto:${templeInfo.address.email}`,
  },
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp",
    lines: [templeInfo.address.whatsapp],
    href: `https://wa.me/${templeInfo.address.whatsapp.replace(/\D/g, "")}`,
  },
];

export default function Contact() {
  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `url(${donationBanner})` }}>
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>We'd Love to Hear From You</span>
            <h1 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Contact Us</h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Reach out with questions, feedback, or to plan your visit — the trust office responds within 1–2 business days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="section-tight">
        <div className="container-xl">
          <div className="contact-cards-grid">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href || "#"}
                target={card.href?.startsWith("http") ? "_blank" : undefined}
                rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="contact-info-icon">{card.icon}</span>
                <h4>{card.title}</h4>
                {card.lines.map((line) => <p key={line}>{line}</p>)}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Feedback Form */}
      <section className="section">
        <div className="container-xl contact-main-grid">
          <motion.div
            className="contact-map-wrap"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
          
            <iframe
              title="Temple Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4518.10994768808!2d72.57009487600799!3d23.028883316091314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858b8aeb5e2b%3A0xe67ed5f821e2edcb!2sShree%20Siddh%20Rudreshwar%20Mahadev%20Mandir!5e1!3m2!1sen!2sin!4v1785145623604!5m2!1sen!2sin" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="eyebrow">Feedback Form</span>
            <h2 className="section-heading" style={{ fontSize: "1.7rem", marginBottom: 20 }}>Send Us a Message</h2>
            <FeedbackForm />
          </motion.div>
        </div>
      </section>

      {/* Social */}
      <section className="section-tight contact-social-section">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Stay Connected</span>
          <h2 className="section-heading" style={{ color: "var(--text-on-navy)", marginBottom: 24 }}>Follow the Trust</h2>
          <div className="contact-social-row">
            <a href="https://www.facebook.com/profile.php?id=61591869633994#" target="_blank" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://www.instagram.com/shreesiddhrudreshwarmahadev/" target="_blank" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://youtube.com/@shreesiddhrudreshwarmahadev?si=kumyrpB5cJxq1nD2" target="_blank" aria-label="YouTube"><FiYoutube /></a>
            <a href={`https://wa.me/${templeInfo.address.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </section>
    </>
  );
}
