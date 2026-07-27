import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { navData } from "../../data/navData";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header className={`site-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container-2xl navbar-inner">
        <Link
          to={ROUTE_PATHS.HOME}
          className="brand"
          onClick={() => setMobileOpen(false)}
        >
          <img src="/about/logo.png" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          <ul>
            {navData.map((item) => (
              <li
                key={item.label}
                className={item.children ? "has-children" : ""}
                onMouseEnter={() => item.children && setOpenSubmenu(item.label)}
                onMouseLeave={() => item.children && setOpenSubmenu(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className="nav-link-btn"
                      aria-expanded={openSubmenu === item.label}
                    >
                      {item.label} <FiChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.label && (
                        <motion.ul
                          className="submenu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                        >
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavLink to={child.path}>{child.label}</NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <Link
            to={ROUTE_PATHS.DONATION}
            className="btn-temple btn-saffron nav-donate-btn"
          >
            <FiHeart /> Donate
          </Link>
          <Link
            to={ROUTE_PATHS.MEMBERSHIP_LOGIN}
            className="btn-temple btn-navy-outline nav-login-btn"
          >
            Member Login
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mobile-drawer-header">
              <span className="brand-text">
                <strong>Menu</strong>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={26} />
              </button>
            </div>
            <ul className="mobile-nav-list">
              {navData.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details>
                      <summary>{item.label}</summary>
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTE_PATHS.DONATION}
              className="btn-temple btn-saffron w-100 justify-content-center"
              onClick={() => setMobileOpen(false)}
            >
              <FiHeart /> Donate Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
