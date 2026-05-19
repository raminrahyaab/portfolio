export function Badge({ children, dot = true }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
      style={{
        backgroundColor: "var(--badge-bg)",
        color: "var(--badge-text-color)",
      }}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--badge-dot-color)" }}
        />
      )}
      {children}
    </span>
  )
}
