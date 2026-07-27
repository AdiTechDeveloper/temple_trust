import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ textAlign: align, marginBottom: 48 }}
    >
      {eyebrow && <span className="eyebrow" style={align === "center" ? { justifyContent: "center" } : {}}>{eyebrow}</span>}
      <h2 className="section-heading" style={light ? { color: "var(--text-on-navy)" } : {}}>{title}</h2>
      {subtitle && (
        <p
          className="section-sub"
          style={{
            margin: align === "center" ? "0 auto" : 0,
            color: light ? "rgba(244,239,225,0.75)" : "var(--text-muted)",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
