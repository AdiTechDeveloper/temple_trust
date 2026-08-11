import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiHeart, FiCalendar, FiUserPlus } from "react-icons/fi";
import { templeInfo } from "../../data/templeInfo";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { useJoinUpdates } from "../../context/JoinUpdatesContext"; // 1. Import context hook
import "./QuickInfoBar.css";

export default function QuickInfoBar() {
  const { openPopup } = useJoinUpdates(); // 2. Consume openPopup from Context

  // 3. Define actions array inside component scope
  const actions = [
    { icon: <FiHeart />, label: "Quick Donate", path: ROUTE_PATHS.DONATION },
    {
      icon: <FiCalendar />,
      label: "Book Puja",
      path: ROUTE_PATHS.PUJA_BOOKING,
    },
    { icon: <FiUserPlus />, label: "Become Member", onClick: openPopup },
  ];

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
              <span className="timing-label">
                <FiClock /> Darshan Timings
              </span>
              <div className="timing-rows">
                {templeInfo.darshanTimings.map((t) => (
                  <span key={t.label}>
                    {t.label}: <strong>{t.time}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div className="timing-divider" />
            <div className="timing-block">
              <span className="timing-label">
                <FiClock /> Today's Aarti
              </span>
              <div className="timing-rows">
                {templeInfo.aartiTimings.map((t) => (
                  <span key={t.label}>
                    {t.label}: <strong>{t.time}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Render <button> for onClick and <Link> for path */}
          <div className="quick-info-actions">
            {actions.map((a) =>
              a.onClick ? (
                <button
                  key={a.label}
                  type="button"
                  onClick={a.onClick}
                  className="quick-action-btn"
                >
                  {a.icon} {a.label}
                </button>
              ) : (
                <Link key={a.label} to={a.path} className="quick-action-btn">
                  {a.icon} {a.label}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
