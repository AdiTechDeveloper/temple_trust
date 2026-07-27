import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./FaqAccordion.css";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-accordion">
      {items.map((item, i) => (
        <div
          key={item.q}
          className={`faq-item ${openIndex === i ? "is-open" : ""}`}
        >
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {item.q}
            <FiChevronDown className="faq-chevron" />
          </button>
          {openIndex === i && <p className="faq-answer">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
