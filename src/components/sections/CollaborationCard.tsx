"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface CollaborationCardProps {
  organization: string;
  description: string;
  type: string;
  icon: LucideIcon;
}

export function CollaborationCard({
  organization,
  description,
  type,
  icon: Icon,
}: CollaborationCardProps) {
  return (
    <Card className="group flex h-full flex-col border-accent/15 bg-surface-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <CardContent className="flex flex-1 flex-col p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
          <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        </div>

        {/* Organization name */}
        <h3 className="text-base font-semibold text-white md:text-lg">
          {organization}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
          {description}
        </p>

        {/* Type badge */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Badge
            variant="outline"
            className="border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent/80"
          >
            {type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
