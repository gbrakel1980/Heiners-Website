import type { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <Card className={cn("group flex min-h-[180px] flex-col self-stretch border-accent/15 bg-surface-card/80 transition-colors duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5", className)}>
      <CardHeader className="pb-3">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
          <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
        </div>
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </CardContent>
    </Card>
  );
}
