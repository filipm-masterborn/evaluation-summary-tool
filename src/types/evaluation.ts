export type BadgeColor = "cyan" | "emerald" | "amber" | "red" | "violet" | "blue";

export type LayoutType = "classic" | "compact" | "minimal";

export interface Badge {
  text: string;
  color: BadgeColor;
}

export interface RatingData {
  score: number;
  maxScore: number;
  respondents: number;
  comment: string;
}

export interface PromotionData {
  decision: string;
  bullets: string[];
}

export interface StrengthItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ImprovementItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface QuoteData {
  text: string;
  author: string;
}

export interface OverallData {
  text: string;
  quote: QuoteData;
  closing: string;
}

export interface SectionVisibility {
  rating: boolean;
  promotion: boolean;
  delta: boolean;
  strengths: boolean;
  improvements: boolean;
  overall: boolean;
}

export interface EvaluationData {
  // Header
  photo: string;
  name: string;
  title: string;
  badge: Badge;

  // Metadata
  mbSince: string;
  promotionDate: string;
  evaluationType: string;

  // Rating
  rating: RatingData;

  // Promotion
  promotion: PromotionData;

  // Delta
  delta: string[];

  // Strengths
  strengths: StrengthItem[];

  // Areas for improvement
  improvements: ImprovementItem[];

  // Overall
  overall: OverallData;

  // Section visibility
  sections: SectionVisibility;

  // Layout
  layout: LayoutType;
}
