interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]";

  const variants = {
    primary:
      "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5",
    outline:
      "border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500",
    ghost:
      "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]",
  };

  const classes = `${base} ${variants[variant]} ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
