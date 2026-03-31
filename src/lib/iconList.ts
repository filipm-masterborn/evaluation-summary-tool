import { icons } from "lucide-react";

export const iconNames: string[] = Object.keys(icons);

export function searchIcons(query: string): string[] {
  if (!query) return iconNames.slice(0, 50);

  const lower = query.toLowerCase();

  return iconNames
    .filter((name) => name.toLowerCase().includes(lower))
    .slice(0, 50);
}
