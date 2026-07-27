import { FaWhatsapp } from "react-icons/fa";
import { templeInfo } from "../../data/templeInfo";
import "./FloatingButtons.css";

export default function FloatingWhatsApp() {
  const number = templeInfo.address.whatsapp.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
