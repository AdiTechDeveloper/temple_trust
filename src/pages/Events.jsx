import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";
import eventsBanner from "../assets/images/home/event_banner.png";
import { getAllEvents } from "../services/templeService";
import { eventImageMap } from "../utils/eventImageMap";
import "./Events.css";

const dateFmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Events() {
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  const filtered = events.filter((e) => (tab === "upcoming" ? !e.isPast : e.isPast));

  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `url(${eventsBanner})` }}>
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>Celebrations</span>
            <h1 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Events & Sacred Celebrations</h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
             Join us in celebrating festivals, religious ceremonies, and community gatherings that inspire devotion, tradition, and togetherness.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          <div className="events-tabs">
            <button className={`events-tab-btn ${tab === "upcoming" ? "active" : ""}`} onClick={() => setTab("upcoming")}>Upcoming Events</button>
            <button className={`events-tab-btn ${tab === "past" ? "active" : ""}`} onClick={() => setTab("past")}>Past Events</button>
          </div>

          <motion.div layout className="events-full-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`event-full-card ${event.isPast ? "is-past" : ""}`}
                >
                  <div className="event-full-image">
                    <img src={eventImageMap[event.image]} alt={event.title} />
                    <div className="event-full-date-chip">
                      <span>{event.day}</span>
                      <small>{event.month}</small>
                    </div>
                    {event.isPast && <span className="event-past-badge">Past Event</span>}
                  </div>
                  <div className="event-full-body">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <span className="event-full-meta"><FiCalendar size={13} /> {dateFmt(event.date)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", padding: "40px 0" }}>No events to show in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
