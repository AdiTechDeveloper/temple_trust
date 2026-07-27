import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiHeart, FiCalendar, FiUserPlus } from "react-icons/fi";
import { templeInfo } from "../../data/templeInfo";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./QuickInfoBar.css";

const actions = [
  { icon: <FiHeart />, label: "Quick Donate", path: ROUTE_PATHS.DONATION },
  { icon: <FiCalendar />, label: "Book Puja", path: ROUTE_PATHS.PUJA_BOOKING },
  { icon: <FiUserPlus />, label: "Become Member", path: ROUTE_PATHS.MEMBERSHIP_REGISTER },
];

export default function QuickInfoBar() {
  return (
    <div className="quick-info-wrap">
      <div className="container-xl">
        <motion.div
          className="quick-info-panel glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="quick-info-timings">
            <div className="timing-block">
              <span className="timing-label"><FiClock /> Darshan Timings</span>
              <div className="timing-rows">
                {templeInfo.darshanTimings.map((t) => (
                  <span key={t.label}>{t.label}: <strong>{t.time}</strong></span>
                ))}
              </div>
            </div>
            <div className="timing-divider" />
            <div className="timing-block">
              <span className="timing-label"><FiClock /> Today's Aarti</span>
              <div className="timing-rows">
                {templeInfo.aartiTimings.map((t) => (
                  <span key={t.label}>{t.label}: <strong>{t.time}</strong></span>
                ))}
              </div>
            </div>
          </div>
          <div className="quick-info-actions">
            {actions.map((a) => (
              <Link key={a.label} to={a.path} className="quick-action-btn">
                {a.icon} {a.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
