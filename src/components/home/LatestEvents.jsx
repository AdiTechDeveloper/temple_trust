import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getUpcomingEvents } from "../../services/templeService";
import { ROUTE_PATHS } from "../../routes/routePaths";
import SectionHeading from "../common/SectionHeading";
import "./LatestEvents.css";

export default function LatestEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUpcomingEvents().then(setEvents);
  }, []);

  return (
    <section className="section events-preview">
      <div className="container-xl">
        <SectionHeading
          eyebrow="What's Happening"
          title="Upcoming Events & Festivals"
          subtitle="From Mahashivratri to Shravan Somvar, mark your calendar for the celebrations bringing the community together."
        />
        <div className="events-list">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              className="event-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="event-date-chip">
                <span className="event-day">{event.day}</span>
                <span className="event-month">{event.month}</span>
              </div>
              <div className="event-info">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
              <Link to={ROUTE_PATHS.EVENTS} className="event-link">
                Details <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
