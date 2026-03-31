"use client";

import { icons, CircleHelp, type LucideProps } from "lucide-react";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, size = 14, className }: DynamicIconProps) {
  const IconComponent = icons[name as keyof typeof icons];

  if (!IconComponent) {
    return <CircleHelp size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
}
