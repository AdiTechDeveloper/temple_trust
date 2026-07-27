import { motion } from "framer-motion";
import { todaysThought } from "../../data/templeInfo";
import "./TodaysThought.css";

export default function TodaysThought() {
  return (
    <section className="thought-strip">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="thought-content"
        >
          <span className="thought-om" aria-hidden="true">ॐ</span>
          <p className="thought-quote">“{todaysThought.quote}”</p>
          <span className="thought-attribution">— {todaysThought.attribution}</span>
        </motion.div>
      </div>
    </section>
  );
}
