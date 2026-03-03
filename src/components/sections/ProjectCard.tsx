import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string;
  techLabel: string;
  category: "offshore" | "onshore";
  categoryLabel: string;
  imageUrl: string;
  imageAlt: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  techLabel,
  category,
  categoryLabel,
  imageUrl,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-light-border bg-light-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warm-accent/40 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className={
              category === "offshore"
                ? "border-blue-400/30 bg-blue-500/20 text-blue-100"
                : "border-green-400/30 bg-green-500/20 text-green-100"
            }
          >
            {categoryLabel}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold leading-snug text-light-text">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="flex-1 text-sm leading-relaxed text-light-text-body">{description}</p>
        <div className="border-t border-light-border pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-accent-dark">
            {techLabel}
          </p>
          <p className="mt-1 text-sm text-light-text">{tech}</p>
        </div>
      </CardContent>
    </Card>
  );
}
