interface SectionHeadingProps {
  label: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  heading,
  subheading,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
        <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 max-w-2xl text-lg text-white/60">{subheading}</p>
      )}
    </div>
  );
}
