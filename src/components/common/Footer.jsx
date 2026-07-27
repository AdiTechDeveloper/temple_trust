import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiLinkedin
} from "react-icons/fi";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { templeInfo } from "../../data/templeInfo";
import SacredDivider from "./SacredDivider";
import "./Footer.css";

const quickLinks = [
  { label: "About Trust", path: ROUTE_PATHS.ABOUT_TRUST },
  { label: "Donation", path: ROUTE_PATHS.DONATION },
  { label: "Puja Booking", path: ROUTE_PATHS.PUJA_BOOKING },
  { label: "Gaushala", path: ROUTE_PATHS.GAUSHALA },
  { label: "Events", path: ROUTE_PATHS.EVENTS },
  { label: "Gallery", path: ROUTE_PATHS.GALLERY },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-top">
          <div className="footer-brand">
            <Link
              to={ROUTE_PATHS.HOME}
              className="brand"
              onClick={() => setMobileOpen(false)}
            >
              <img className="logo" src="/about/logo.png" />
            </Link>
          </div>
          <SacredDivider />
        </div>

        <div className="footer-grid">
          <div>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.path}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Darshan Timings</h4>
            <ul className="plain">
              {templeInfo.darshanTimings.map((t) => (
                <li key={t.label}>
                  <strong>{t.label}:</strong> {t.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="plain">
              <li>
                <FiMapPin /> {templeInfo.address.line1},{" "}
                {templeInfo.address.line2}
              </li>
              <li>
                <FiPhone /> {templeInfo.address.phone}
              </li>
              <li>
                <FiMail /> {templeInfo.address.email}
              </li>
            </ul>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <p style={{ color: "rgba(244,239,225,0.7)", marginBottom: 16 }}>
              Stay Connected for Daily Darshan, Temple Events & Spiritual Updates
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/shree-rudreshwar-seva-sanstha-charitable-trust/about/?viewAsMember=true
" aria-label="Facebook" target="_blank"><FiLinkedin /></a>
              <a href="https://www.instagram.com/shreesiddhrudreshwarmahadev/" aria-label="Instagram" target="_blank"><FiInstagram /></a>
              <a href="https://www.youtube.com/@shrirudreshwar-n8k" aria-label="YouTube" target="_blank"><FiYoutube /></a>
              <a href="https://www.facebook.com/profile.php?id=61591869633994" target="_blank" aria-label="Facebook">
                <FiFacebook />
              </a>
            
             
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {templeInfo.trustName}. All rights
            reserved.
          </p>
          <p>
            Crafted with devotion by{" "}
            <Link to="https://theaditech.com/" target="_blank">
              The AdiTech
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
