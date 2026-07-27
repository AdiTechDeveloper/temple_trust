import { motion } from "framer-motion";
import SacredDivider from "../components/common/SacredDivider";

export default function ComingSoon({ title }) {
  return (
    <section className="section" style={{ textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Under Construction</span>
          <h1 className="section-heading">{title}</h1>
          <p style={{ maxWidth: 520, margin: "0 auto 24px" }}>
            This page is being crafted with the same care as the rest of the temple site and will be added in the next build pass.
          </p>
          <SacredDivider />
        </motion.div>
      </div>
    </section>
  );
}
