interface ProjectCardProps {
  title: string;
  description: string;
  tech: string;
  techLabel: string;
  index: number;
}

export function ProjectCard({ title, description, tech, techLabel, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative overflow-hidden rounded-lg border border-light-border bg-light-surface shadow-sm transition-all duration-300 hover:shadow-md hover:border-warm-accent/50">

      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-warm-accent via-warm-accent/50 to-transparent" />

      {/* Ghost number backdrop */}
      <div
        className="pointer-events-none absolute right-2 top-0 select-none overflow-hidden leading-none"
        aria-hidden="true"
      >
        <span className="block font-black leading-none tracking-tighter text-warm-accent opacity-[0.045]"
          style={{ fontSize: "9rem", fontFamily: "var(--font-outfit)" }}>
          {num}
        </span>
      </div>

      {/* Dot grid texture — fades in from the right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(212,168,69,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 55%)",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative flex flex-col gap-5 p-6 md:flex-row md:items-start md:gap-8 md:p-8">

        {/* Left: index badge + title + description */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-warm-accent/40 bg-warm-accent/[0.06] font-mono text-xs font-bold tabular-nums text-warm-accent">
              {num}
            </span>
            <h3 className="text-base font-semibold leading-snug text-light-text">
              {title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-light-text-body md:pl-10">
            {description}
          </p>
        </div>

        {/* Right: tech spec block */}
        <div className="flex-shrink-0 border-t border-light-border pt-4 md:w-56 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-warm-accent-dark">
            {techLabel}
          </p>
          <p className="text-sm leading-relaxed text-light-text">{tech}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="mx-6 h-px bg-gradient-to-r from-warm-accent/25 to-transparent transition-all duration-500 group-hover:from-warm-accent/55 md:mx-8" />
      <div className="h-3" />
    </div>
  );
}
