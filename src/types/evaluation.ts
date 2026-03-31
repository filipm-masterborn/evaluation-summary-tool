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
  comment: string; // HTML from WYSIWYG
}

export interface PromotionData {
  content: string; // HTML from WYSIWYG (decision + bullets)
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

export interface OverallData {
  content: string; // HTML from WYSIWYG (text + quote + closing merged)
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

  // Delta — HTML from WYSIWYG
  delta: string;

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
