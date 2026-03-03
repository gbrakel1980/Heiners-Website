interface SectionHeadingProps {
  label: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
}

export function SectionHeading({
  label,
  heading,
  subheading,
  align = "center",
  variant = "dark",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  const labelColor = variant === "light" ? "text-warm-accent-dark" : "text-accent";
  const lineColor = variant === "light" ? "bg-warm-accent/50" : "bg-accent/50";
  const headingColor = variant === "light" ? "text-light-text" : "text-white";
  const subColor = variant === "light" ? "text-light-text-muted" : "text-white/60";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`h-px w-8 ${lineColor}`} aria-hidden="true" />
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${labelColor}`}>
          {label}
        </span>
        <span className={`h-px w-8 ${lineColor}`} aria-hidden="true" />
      </div>
      <h2 className={`font-display text-3xl font-bold md:text-4xl lg:text-5xl ${headingColor}`}>
        {heading}
      </h2>
      {subheading && (
        <p className={`mt-4 max-w-2xl text-lg ${subColor}`}>{subheading}</p>
      )}
    </div>
  );
}
