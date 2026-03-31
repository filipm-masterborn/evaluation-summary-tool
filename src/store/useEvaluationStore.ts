import { create } from "zustand";
import {
  EvaluationData,
  StrengthItem,
  ImprovementItem,
  LayoutType,
  BadgeColor,
} from "@/types/evaluation";
import { defaultData } from "@/lib/defaultData";

interface EvaluationStore extends EvaluationData {
  // Setters
  setField: <K extends keyof EvaluationData>(
    key: K,
    value: EvaluationData[K]
  ) => void;
  setPhoto: (url: string) => void;
  setName: (name: string) => void;
  setTitle: (title: string) => void;
  setBadgeText: (text: string) => void;
  setBadgeColor: (color: BadgeColor) => void;
  setRatingScore: (score: number) => void;
  setRatingComment: (comment: string) => void;
  setRatingRespondents: (count: number) => void;
  setPromotionDecision: (decision: string) => void;
  setPromotionBullets: (bullets: string[]) => void;
  setDelta: (delta: string[]) => void;
  setStrengths: (strengths: StrengthItem[]) => void;
  setImprovements: (improvements: ImprovementItem[]) => void;
  setOverallText: (text: string) => void;
  setQuoteText: (text: string) => void;
  setQuoteAuthor: (author: string) => void;
  setClosing: (text: string) => void;
  toggleSection: (section: keyof EvaluationData["sections"]) => void;
  setLayout: (layout: LayoutType) => void;
  setMbSince: (value: string) => void;
  setPromotionDate: (value: string) => void;
  setEvaluationType: (value: string) => void;
  resetToDefault: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  ...defaultData,

  setField: (key, value) => set({ [key]: value }),
  setPhoto: (url) => set({ photo: url }),
  setName: (name) => set({ name }),
  setTitle: (title) => set({ title }),
  setBadgeText: (text) =>
    set((s) => ({ badge: { ...s.badge, text } })),
  setBadgeColor: (color) =>
    set((s) => ({ badge: { ...s.badge, color } })),
  setRatingScore: (score) =>
    set((s) => ({ rating: { ...s.rating, score } })),
  setRatingComment: (comment) =>
    set((s) => ({ rating: { ...s.rating, comment } })),
  setRatingRespondents: (respondents) =>
    set((s) => ({ rating: { ...s.rating, respondents } })),
  setPromotionDecision: (decision) =>
    set((s) => ({ promotion: { ...s.promotion, decision } })),
  setPromotionBullets: (bullets) =>
    set((s) => ({ promotion: { ...s.promotion, bullets } })),
  setDelta: (delta) => set({ delta }),
  setStrengths: (strengths) => set({ strengths }),
  setImprovements: (improvements) => set({ improvements }),
  setOverallText: (text) =>
    set((s) => ({ overall: { ...s.overall, text } })),
  setQuoteText: (text) =>
    set((s) => ({ overall: { ...s.overall, quote: { ...s.overall.quote, text } } })),
  setQuoteAuthor: (author) =>
    set((s) => ({
      overall: { ...s.overall, quote: { ...s.overall.quote, author } },
    })),
  setClosing: (text) =>
    set((s) => ({ overall: { ...s.overall, closing: text } })),
  toggleSection: (section) =>
    set((s) => ({
      sections: { ...s.sections, [section]: !s.sections[section] },
    })),
  setLayout: (layout) => set({ layout }),
  setMbSince: (mbSince) => set({ mbSince }),
  setPromotionDate: (promotionDate) => set({ promotionDate }),
  setEvaluationType: (evaluationType) => set({ evaluationType }),
  resetToDefault: () => set(defaultData),
}));
