// The site's single signature element: a fine gold linework glyph combining
// a trishul (trident), damaru (drum) and a flame — used sparingly as a
// section-break mark instead of a generic horizontal rule.
export default function SacredDivider({ className = "" }) {
  return (
    <div className={`sacred-divider ${className}`} aria-hidden="true">
      <span className="line" />
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path
          d="M17 3 L17 22 M11 8 L17 3 L23 8 M9 13 C11 10 14 9 17 9 C20 9 23 10 25 13"
          stroke="var(--gold)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="27" r="4.2" stroke="var(--gold)" strokeWidth="1.3" />
        <path d="M17 27 m-1.4 0 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0" fill="var(--gold)" />
      </svg>
      <span className="line" />
    </div>
  );
}
