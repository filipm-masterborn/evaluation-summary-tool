"use client";

import { EvaluationData } from "@/types/evaluation";
import { DynamicIcon } from "@/lib/DynamicIcon";
import { useEvaluationStore } from "@/store/useEvaluationStore";

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  cyan: { bg: "bg-cyan-200", text: "text-cyan-800" },
  emerald: { bg: "bg-emerald-200", text: "text-emerald-800" },
  amber: { bg: "bg-amber-200", text: "text-amber-800" },
  red: { bg: "bg-red-200", text: "text-red-800" },
  violet: { bg: "bg-violet-200", text: "text-violet-800" },
  blue: { bg: "bg-blue-200", text: "text-blue-800" },
};

export default function CompactLayout({ data }: { data: EvaluationData }) {
  const { setFocusedSection } = useEvaluationStore();
  const badgeStyle = BADGE_COLORS[data.badge.color] || BADGE_COLORS.cyan;
  const ratingPercent = data.rating.maxScore > 0 ? data.rating.score / data.rating.maxScore : 0;

  return (
    <div className="bg-neutral-100 p-[20px] w-[800px]" style={{ fontFeatureSettings: "'ss01' on" }}>
      <div className="flex flex-col gap-[16px]">
        {/* === HEADER - wider, horizontal === */}
        <div
          className="flex gap-[20px] items-center cursor-pointer rounded-xl hover:bg-blue-50/40 hover:ring-1 hover:ring-blue-300 transition-all"
          onClick={() => setFocusedSection("profil")}
        >
          <div className="rounded-[16px] w-[72px] h-[72px] overflow-hidden shrink-0 bg-neutral-200">
            {data.photo ? (
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <DynamicIcon name="User" size={32} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[4px] flex-1">
            <div className="flex items-center gap-[12px]">
              <p className="font-[family-name:var(--font-space-grotesk)] font-medium text-[20px] text-neutral-800 uppercase">
                {data.name}
              </p>
              <div className={`${badgeStyle.bg} px-[10px] py-[2px] rounded-[10px]`}>
                <p className={`font-[family-name:var(--font-jetbrains)] font-bold text-[10px] ${badgeStyle.text} tracking-[0.4px]`}>
                  {data.badge.text}
                </p>
              </div>
            </div>
            <p className="font-[family-name:var(--font-jetbrains)] font-semibold text-[12px] text-neutral-500">
              {data.title}
            </p>
          </div>
          {/* Metadata in header */}
          <div className="flex gap-[20px] shrink-0">
            <div className="flex flex-col gap-[2px]">
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">W MB OD</p>
              <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[11px] text-neutral-800">{data.mbSince}</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">AWANS</p>
              <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[11px] text-neutral-800">{data.promotionDate}</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">EWALUACJA</p>
              <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[11px] text-neutral-800">{data.evaluationType}</p>
            </div>
          </div>
        </div>

        {/* === TOP ROW: Rating + Promotion + Delta === */}
        <div className="flex gap-[12px]">
          {data.sections.rating && (
            <div
              className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[8px] p-[14px] rounded-[12px] w-[200px] shrink-0 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              onClick={() => setFocusedSection("rating")}
            >
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">RATING</p>
                <div className="flex gap-[3px] items-end">
                  <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[16px] text-neutral-800">{data.rating.score}</p>
                  <p className="font-[family-name:var(--font-space-grotesk)] font-medium text-[11px] text-neutral-500">/{data.rating.maxScore}</p>
                </div>
              </div>
              <div className="w-full bg-emerald-100 h-[5px] rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ratingPercent * 100}%` }} />
              </div>
              <div
                className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: data.rating.comment }}
              />
            </div>
          )}
          {data.sections.promotion && (
            <div
              className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[8px] p-[14px] rounded-[12px] w-[200px] shrink-0 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              onClick={() => setFocusedSection("awans")}
            >
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">AWANS?</p>
              <div
                className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: data.promotion.content }}
              />
            </div>
          )}
          {data.sections.delta && data.delta && (
            <div
              className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[6px] p-[14px] rounded-[12px] flex-1 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              onClick={() => setFocusedSection("delta")}
            >
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">DELTA</p>
              <div
                className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: data.delta }}
              />
            </div>
          )}
        </div>

        {/* === STRENGTHS + IMPROVEMENTS side by side === */}
        {(data.sections.strengths || data.sections.improvements) && (
          <div className="flex gap-[12px]">
            {data.sections.strengths && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[12px] flex-1 p-[14px] rounded-[12px] cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("strengths")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px] uppercase">Strengths</p>
                {data.strengths.map((item) => (
                  <div key={item.id} className="flex gap-[8px] items-start">
                    <DynamicIcon name={item.icon} size={12} className="text-emerald-600 shrink-0 mt-[1px]" />
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-800 uppercase leading-[1.4]">{item.title}</p>
                      <p className="font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.4] tracking-[-0.2px]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {data.sections.improvements && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[12px] flex-1 p-[14px] rounded-[12px] cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("improvements")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px] uppercase">Areas for improvement</p>
                {data.improvements.map((item) => (
                  <div key={item.id} className="flex gap-[8px] items-start">
                    <DynamicIcon name={item.icon} size={12} className="text-amber-600 shrink-0 mt-[1px]" />
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-800 uppercase leading-[1.4]">{item.title}</p>
                      <p className="font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.4] tracking-[-0.2px] whitespace-pre-wrap">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === OVERALL === */}
        {data.sections.overall && (
          <div
            className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[8px] p-[14px] rounded-[12px] cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            onClick={() => setFocusedSection("overall")}
          >
            <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[9px] text-neutral-500 tracking-[0.4px]">OVERALL</p>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[9px] text-neutral-600 leading-[1.5]"
              dangerouslySetInnerHTML={{ __html: data.overall.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
