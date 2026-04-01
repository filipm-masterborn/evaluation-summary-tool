"use client";

import { useEvaluationStore } from "@/store/useEvaluationStore";
import { BadgeColor, LayoutType, StrengthItem, ImprovementItem } from "@/types/evaluation";
import { IconPicker } from "./IconPicker";
import { RichTextEditor } from "./RichTextEditor";
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RotateCcw,
  LayoutTemplate,
  Columns3,
  Minus,
  ChevronRight,
  Info,
} from "lucide-react";
import { useState } from "react";

const BADGE_COLORS: { value: BadgeColor; label: string; swatch: string }[] = [
  { value: "cyan", label: "Cyan", swatch: "bg-cyan-300" },
  { value: "emerald", label: "Emerald", swatch: "bg-emerald-300" },
  { value: "amber", label: "Amber", swatch: "bg-amber-300" },
  { value: "red", label: "Red", swatch: "bg-red-300" },
  { value: "violet", label: "Violet", swatch: "bg-violet-300" },
  { value: "blue", label: "Blue", swatch: "bg-blue-300" },
];

const LAYOUTS: { value: LayoutType; label: string; icon: React.ReactNode }[] = [
  { value: "classic", label: "Classic", icon: <LayoutTemplate size={16} /> },
  { value: "compact", label: "Compact", icon: <Columns3 size={16} /> },
  { value: "minimal", label: "Minimal", icon: <Minus size={16} /> },
];

function SectionToggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-[family-name:var(--font-jetbrains)] font-bold tracking-[0.3px] uppercase transition-colors border ${
        enabled
          ? "bg-white text-neutral-700 border-neutral-300"
          : "bg-neutral-100 text-neutral-400 border-neutral-100 line-through"
      }`}
    >
      {enabled ? <Eye size={12} /> : <EyeOff size={12} />}
      {label}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] uppercase block mb-1">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition ${className}`}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 2,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition resize-y overflow-y-auto min-h-[2.5rem] max-h-[12rem]"
    />
  );
}

function SectionCard({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-neutral-200 rounded-xl bg-white overflow-hidden shrink-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition"
      >
        <span className="font-[family-name:var(--font-jetbrains)] font-bold text-[11px] text-neutral-700 tracking-[0.3px] uppercase">
          {title}
        </span>
        <span className={`text-neutral-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
          <ChevronRight size={14} />
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          {children}
        </div>
      )}
    </div>
  );
}

type SectionId = "profil" | "rating" | "awans" | "delta" | "strengths" | "improvements" | "overall";

export default function EvaluationForm() {
  const store = useEvaluationStore();
  const [openSection, setOpenSection] = useState<SectionId | null>("profil");

  const toggleSection = (id: SectionId) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const addStrength = () => {
    const newItem: StrengthItem = {
      id: `s${Date.now()}`,
      icon: "Star",
      title: "Nowy strength",
      description: "Opis...",
    };
    store.setStrengths([...store.strengths, newItem]);
  };

  const updateStrength = (id: string, field: keyof StrengthItem, value: string) => {
    store.setStrengths(
      store.strengths.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeStrength = (id: string) => {
    store.setStrengths(store.strengths.filter((s) => s.id !== id));
  };

  const addImprovement = () => {
    const newItem: ImprovementItem = {
      id: `i${Date.now()}`,
      icon: "AlertTriangle",
      title: "Nowy area",
      description: "Opis...",
    };
    store.setImprovements([...store.improvements, newItem]);
  };

  const updateImprovement = (id: string, field: keyof ImprovementItem, value: string) => {
    store.setImprovements(
      store.improvements.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeImprovement = (id: string) => {
    store.setImprovements(store.improvements.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
      {/* Layout selector */}
      <div className="flex items-center gap-2">
        {LAYOUTS.map((l) => (
          <button
            key={l.value}
            onClick={() => store.setLayout(l.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-[family-name:var(--font-jetbrains)] font-bold tracking-[0.3px] transition ${
              store.layout === l.value
                ? "bg-neutral-800 text-white"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            {l.icon}
            {l.label}
          </button>
        ))}
        <button
          onClick={store.resetToDefault}
          className="ml-auto flex items-center gap-1 px-3 py-2 rounded-lg text-[11px] font-[family-name:var(--font-jetbrains)] text-neutral-400 hover:text-red-500 hover:bg-red-50 transition"
          title="Reset do domyślnych danych"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Section toggles */}
      <div className="flex flex-wrap gap-1.5">
        <SectionToggle label="Rating" enabled={store.sections.rating} onToggle={() => store.toggleSection("rating")} />
        <SectionToggle label="Awans" enabled={store.sections.promotion} onToggle={() => store.toggleSection("promotion")} />
        <SectionToggle label="Delta" enabled={store.sections.delta} onToggle={() => store.toggleSection("delta")} />
        <SectionToggle label="Strengths" enabled={store.sections.strengths} onToggle={() => store.toggleSection("strengths")} />
        <SectionToggle label="Improvements" enabled={store.sections.improvements} onToggle={() => store.toggleSection("improvements")} />
        <SectionToggle label="Overall" enabled={store.sections.overall} onToggle={() => store.toggleSection("overall")} />
      </div>

      {/* Header section */}
      <SectionCard title="Profil" open={openSection === "profil"} onToggle={() => toggleSection("profil")}>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <label className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] uppercase">
              Zdjęcie (URL)
            </label>
            <div className="relative group">
              <Info size={11} className="text-neutral-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-1.5 w-56 p-2.5 rounded-lg bg-neutral-800 text-white text-[10px] font-[family-name:var(--font-inter)] leading-[1.4] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-lg">
                Kliknij w zdjęcie osoby na Slacku → na podglądzie awatara PPM → &quot;Copy Image Address&quot;
              </div>
            </div>
          </div>
          <Input
            value={store.photo}
            onChange={store.setPhoto}
            placeholder="https://example.com/photo.jpg lub link ze Slacka..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Imię i Nazwisko</Label>
            <Input value={store.name} onChange={store.setName} />
          </div>
          <div>
            <Label>Stanowisko</Label>
            <Input value={store.title} onChange={store.setTitle} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Badge Text</Label>
            <Input value={store.badge.text} onChange={store.setBadgeText} />
          </div>
          <div>
            <Label>Badge Color</Label>
            <div className="flex gap-1.5 mt-1">
              {BADGE_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => store.setBadgeColor(c.value)}
                  className={`w-6 h-6 rounded-full ${c.swatch} border-2 transition ${
                    store.badge.color === c.value
                      ? "border-neutral-800 scale-110"
                      : "border-transparent hover:border-neutral-300"
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>W MB od</Label>
            <Input value={store.mbSince} onChange={store.setMbSince} />
          </div>
          <div>
            <Label>Awans</Label>
            <Input value={store.promotionDate} onChange={store.setPromotionDate} />
          </div>
          <div>
            <Label>Ewaluacja</Label>
            <Input value={store.evaluationType} onChange={store.setEvaluationType} />
          </div>
        </div>
      </SectionCard>

      {/* Rating */}
      <SectionCard title="Rating" open={openSection === "rating"} onToggle={() => toggleSection("rating")}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Score</Label>
            <input
              type="number"
              step="0.1"
              min="0"
              max={store.rating.maxScore}
              value={store.rating.score}
              onChange={(e) => store.setRatingScore(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>
          <div>
            <Label>Max Score</Label>
            <input
              type="number"
              step="1"
              min="1"
              value={store.rating.maxScore}
              onChange={(e) =>
                store.setField("rating", {
                  ...store.rating,
                  maxScore: parseInt(e.target.value) || 4,
                })
              }
              className="w-full px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>
          <div>
            <Label>Respondentów</Label>
            <input
              type="number"
              min="0"
              value={store.rating.respondents}
              onChange={(e) => store.setRatingRespondents(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-[12px] font-[family-name:var(--font-inter)] border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>
        </div>
        <div>
          <Label>Komentarz</Label>
          <RichTextEditor
            content={store.rating.comment}
            onChange={store.setRatingComment}
            placeholder="Komentarz do ratingu..."
          />
        </div>
      </SectionCard>

      {/* Promotion */}
      <SectionCard title="Awans" open={openSection === "awans"} onToggle={() => toggleSection("awans")}>
        <div>
          <Label>Decyzja + punkty</Label>
          <RichTextEditor
            content={store.promotion.content}
            onChange={store.setPromotionContent}
            placeholder="Decyzja awansowa i uzasadnienie..."
          />
        </div>
      </SectionCard>

      {/* Delta */}
      <SectionCard title="Delta" open={openSection === "delta"} onToggle={() => toggleSection("delta")}>
        <div>
          <Label>Zmiany / wydarzenia</Label>
          <RichTextEditor
            content={store.delta}
            onChange={store.setDelta}
            placeholder="Kluczowe zmiany w okresie ewaluacji..."
          />
        </div>
      </SectionCard>

      {/* Strengths */}
      <SectionCard title="Strengths" open={openSection === "strengths"} onToggle={() => toggleSection("strengths")}>
        {store.strengths.map((item) => (
          <div key={item.id} className="border border-neutral-100 rounded-lg p-4 flex flex-col gap-3 bg-neutral-50">
            <div className="flex items-center gap-2">
              <IconPicker
                value={item.icon}
                onChange={(icon) => updateStrength(item.id, "icon", icon)}
              />
              <Input
                value={item.title}
                onChange={(v) => updateStrength(item.id, "title", v)}
                placeholder="Tytuł"
                className="flex-1"
              />
              <button
                onClick={() => removeStrength(item.id)}
                className="text-neutral-300 hover:text-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <TextArea
              value={item.description}
              onChange={(v) => updateStrength(item.id, "description", v)}
              rows={3}
              placeholder="Opis..."
            />
          </div>
        ))}
        <button
          onClick={addStrength}
          className="flex items-center gap-1 text-[11px] text-cyan-600 hover:text-cyan-800 font-[family-name:var(--font-jetbrains)] font-bold"
        >
          <Plus size={12} /> Dodaj strength
        </button>
      </SectionCard>

      {/* Improvements */}
      <SectionCard title="Areas for Improvement" open={openSection === "improvements"} onToggle={() => toggleSection("improvements")}>
        {store.improvements.map((item) => (
          <div key={item.id} className="border border-neutral-100 rounded-lg p-4 flex flex-col gap-3 bg-neutral-50">
            <div className="flex items-center gap-2">
              <IconPicker
                value={item.icon}
                onChange={(icon) => updateImprovement(item.id, "icon", icon)}
              />
              <Input
                value={item.title}
                onChange={(v) => updateImprovement(item.id, "title", v)}
                placeholder="Tytuł"
                className="flex-1"
              />
              <button
                onClick={() => removeImprovement(item.id)}
                className="text-neutral-300 hover:text-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <TextArea
              value={item.description}
              onChange={(v) => updateImprovement(item.id, "description", v)}
              rows={3}
              placeholder="Opis..."
            />
          </div>
        ))}
        <button
          onClick={addImprovement}
          className="flex items-center gap-1 text-[11px] text-cyan-600 hover:text-cyan-800 font-[family-name:var(--font-jetbrains)] font-bold"
        >
          <Plus size={12} /> Dodaj improvement
        </button>
      </SectionCard>

      {/* Overall */}
      <SectionCard title="Overall" open={openSection === "overall"} onToggle={() => toggleSection("overall")}>
        <div>
          <Label>Podsumowanie</Label>
          <RichTextEditor
            content={store.overall.content}
            onChange={store.setOverallContent}
            placeholder="Podsumowanie ewaluacji — tekst, cytaty, zamknięcie..."
          />
        </div>
      </SectionCard>
    </div>
  );
}
