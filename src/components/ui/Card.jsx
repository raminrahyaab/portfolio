export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-shadow duration-300 ${className}`}
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      {children}
    </div>
  )
}
