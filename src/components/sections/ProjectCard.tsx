import { Card, CardTitle } from "@/components/ui/card";
import { ProjectVisual } from "@/components/sections/ProjectVisual";

type ProjectKey = "selfShieldingHV" | "rinikenSwitzerland" | "hotSpotDistrictHeating";

interface ProjectCardProps {
  projectKey: ProjectKey;
  title: string;
  description: string;
  tech: string;
  techLabel: string;
  index: number;
}

export function ProjectCard({
  projectKey,
  title,
  description,
  tech,
  techLabel,
  index,
}: ProjectCardProps) {
  const reversed = index % 2 === 1;

  return (
    <Card className="group overflow-hidden border-light-border bg-light-surface shadow-sm transition-all duration-300 hover:border-warm-accent/40 hover:shadow-lg">
      <div className={`flex flex-col md:flex-row ${reversed ? "md:flex-row-reverse" : ""}`}>

        {/* Technical illustration panel */}
        <div className="relative h-56 w-full flex-shrink-0 overflow-hidden md:h-auto md:w-2/5">
          <ProjectVisual projectKey={projectKey} />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 text-2xl font-bold text-warm-accent/30 leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <CardTitle className="text-base font-semibold leading-snug text-light-text">
              {title}
            </CardTitle>
          </div>
          <p className="flex-1 text-sm leading-relaxed text-light-text-body pl-9">
            {description}
          </p>
          <div className="border-t border-light-border pt-3 pl-9">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-accent-dark">
              {techLabel}
            </p>
            <p className="mt-1 text-sm text-light-text">{tech}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
