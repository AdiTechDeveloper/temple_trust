import { useCountUp } from "../../hooks/useCountUp";
import "./InlineStatsRow.css";

function InlineStat({ stat }) {
  const [value, ref] = useCountUp(stat.value);
  return (
    <div className="inline-stat" ref={ref}>
      <span className="inline-stat-value">{value.toLocaleString("en-IN")}{stat.suffix}</span>
      <span className="inline-stat-label">{stat.label}</span>
    </div>
  );
}

export default function InlineStatsRow({ stats }) {
  return (
    <div className="inline-stats-row">
      {stats.map((s) => <InlineStat key={s.id} stat={s} />)}
    </div>
  );
}
