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
    <Card className="group flex h-full flex-col overflow-hidden border-accent/15 bg-surface-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className={
              category === "offshore"
                ? "border-blue-400/30 bg-blue-500/20 text-blue-300"
                : "border-green-400/30 bg-green-500/20 text-green-300"
            }
          >
            {categoryLabel}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold leading-snug text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="flex-1 text-sm leading-relaxed text-white/60">{description}</p>
        <div className="border-t border-accent/10 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent/70">
            {techLabel}
          </p>
          <p className="mt-1 text-sm text-white/80">{tech}</p>
        </div>
      </CardContent>
    </Card>
  );
}
