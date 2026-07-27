import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./FloatingButtons.css";

export default function StickyDonateButton() {
  return (
    <Link to={ROUTE_PATHS.DONATION} className="sticky-donate">
      <FiHeart /> <span>Donate</span>
    </Link>
  );
}
