export function Button({ children, variant = "primary", href, className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer"

  const variants = {
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
    outline: "border-2 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]",
    ghost: "text-[var(--foreground)] hover:bg-[var(--secondary)]",
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
