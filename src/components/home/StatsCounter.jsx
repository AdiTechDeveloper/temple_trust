import { useEffect, useState } from "react";
import { getStats } from "../../services/templeService";
import { useCountUp } from "../../hooks/useCountUp";
import "./StatsCounter.css";

function StatCard({ stat }) {
  const [value, ref] = useCountUp(stat.value);
  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-value">{value.toLocaleString("en-IN")}{stat.suffix}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function StatsCounter() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <section className="stats-section">
      <div className="container-xl stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
