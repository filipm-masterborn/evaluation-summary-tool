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
  // Interactive preview focus signal
  focusSectionSignal: { id: string; nonce: number } | null;
  setFocusedSection: (id: string) => void;

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
  setPromotionContent: (content: string) => void;
  setDelta: (delta: string) => void;
  setStrengths: (strengths: StrengthItem[]) => void;
  setImprovements: (improvements: ImprovementItem[]) => void;
  setOverallContent: (content: string) => void;
  toggleSection: (section: keyof EvaluationData["sections"]) => void;
  setLayout: (layout: LayoutType) => void;
  setMbSince: (value: string) => void;
  setPromotionDate: (value: string) => void;
  setEvaluationType: (value: string) => void;
  resetToDefault: () => void;
  clearAll: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  ...defaultData,

  focusSectionSignal: null,
  setFocusedSection: (id) =>
    set((s) => ({
      focusSectionSignal: { id, nonce: (s.focusSectionSignal?.nonce ?? 0) + 1 },
    })),

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
  setPromotionContent: (content) =>
    set({ promotion: { content } }),
  setDelta: (delta) => set({ delta }),
  setStrengths: (strengths) => set({ strengths }),
  setImprovements: (improvements) => set({ improvements }),
  setOverallContent: (content) =>
    set({ overall: { content } }),
  toggleSection: (section) =>
    set((s) => ({
      sections: { ...s.sections, [section]: !s.sections[section] },
    })),
  setLayout: (layout) => set({ layout }),
  setMbSince: (mbSince) => set({ mbSince }),
  setPromotionDate: (promotionDate) => set({ promotionDate }),
  setEvaluationType: (evaluationType) => set({ evaluationType }),
  resetToDefault: () => set(defaultData),
  clearAll: () =>
    set((s) => ({
      photo: "",
      name: "",
      title: "",
      badge: { text: "", color: s.badge.color },
      mbSince: "",
      promotionDate: "",
      evaluationType: "",
      rating: { score: 0, maxScore: 4, respondents: 0, comment: "" },
      promotion: { content: "" },
      delta: "",
      strengths: [],
      improvements: [],
      overall: { content: "" },
    })),
}));
