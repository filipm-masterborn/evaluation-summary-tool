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

export default function MinimalLayout({ data }: { data: EvaluationData }) {
  const { setFocusedSection } = useEvaluationStore();
  const badgeStyle = BADGE_COLORS[data.badge.color] || BADGE_COLORS.cyan;
  const ratingPercent = data.rating.maxScore > 0 ? data.rating.score / data.rating.maxScore : 0;

  return (
    <div className="bg-white p-[32px] w-[595px]" style={{ fontFeatureSettings: "'ss01' on" }}>
      <div className="flex flex-col gap-[24px]">
        {/* === HEADER - minimal, clean === */}
        <div
          className="flex items-center gap-[16px] pb-[20px] border-b border-neutral-200 cursor-pointer rounded-xl hover:bg-blue-50/40 hover:ring-1 hover:ring-blue-300 transition-all"
          onClick={() => setFocusedSection("profil")}
        >
          <div className="rounded-full w-[64px] h-[64px] overflow-hidden shrink-0 bg-neutral-100">
            {data.photo ? (
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <DynamicIcon name="User" size={28} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-[10px]">
              <h1 className="font-[family-name:var(--font-space-grotesk)] font-medium text-[22px] text-neutral-900">
                {data.name}
              </h1>
              <div className={`${badgeStyle.bg} px-[8px] py-[2px] rounded-full`}>
                <p className={`font-[family-name:var(--font-jetbrains)] font-bold text-[9px] ${badgeStyle.text} tracking-[0.4px]`}>
                  {data.badge.text}
                </p>
              </div>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-neutral-500 mt-[2px]">
              {data.title}
            </p>
            <div className="flex gap-[16px] mt-[8px]">
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-neutral-400">
                <span className="font-bold tracking-[0.3px]">MB:</span>{" "}
                <span className="text-neutral-600">{data.mbSince}</span>
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-neutral-400">
                <span className="font-bold tracking-[0.3px]">AWANS:</span>{" "}
                <span className="text-neutral-600">{data.promotionDate}</span>
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-neutral-400">
                <span className="font-bold tracking-[0.3px]">EWALUACJA:</span>{" "}
                <span className="text-neutral-600">{data.evaluationType}</span>
              </span>
            </div>
          </div>
        </div>

        {/* === RATING === */}
        {data.sections.rating && (
          <div
            className="flex items-center gap-[16px] cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
            onClick={() => setFocusedSection("rating")}
          >
            <div className="flex items-end gap-[4px]">
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-[28px] text-neutral-900 leading-none">
                {data.rating.score}
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] text-[14px] text-neutral-400 mb-[2px]">
                /{data.rating.maxScore}
              </span>
            </div>
            <div className="flex-1">
              <div className="w-full bg-neutral-100 h-[4px] rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${ratingPercent * 100}%` }} />
              </div>
              <div className="flex items-baseline gap-[4px] mt-[4px]">
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-neutral-500 shrink-0">
                  {data.rating.respondents} respondentów —
                </span>
                <div
                  className="rich-preview font-[family-name:var(--font-inter)] text-[10px] text-neutral-500 leading-[1.4] [&_p]:inline"
                  dangerouslySetInnerHTML={{ __html: data.rating.comment }}
                />
              </div>
            </div>
          </div>
        )}

        {/* === PROMOTION === */}
        {data.sections.promotion && (
          <div
            className="cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
            onClick={() => setFocusedSection("awans")}
          >
            <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-400 tracking-[0.5px] uppercase mb-[8px]">
              Awans?
            </p>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] text-[11px] text-neutral-600 leading-[1.5]"
              dangerouslySetInnerHTML={{ __html: data.promotion.content }}
            />
          </div>
        )}

        {/* === DELTA as simple list === */}
        {data.sections.delta && data.delta && (
          <div
            className="cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
            onClick={() => setFocusedSection("delta")}
          >
            <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-400 tracking-[0.5px] uppercase mb-[8px]">
              Delta
            </p>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] text-[11px] text-neutral-600 leading-[1.5]"
              dangerouslySetInnerHTML={{ __html: data.delta }}
            />
          </div>
        )}

        {/* === STRENGTHS + IMPROVEMENTS in 2 cols === */}
        {(data.sections.strengths || data.sections.improvements) && (
          <div className="grid grid-cols-2 gap-[24px]">
            {data.sections.strengths && (
              <div
                className="cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
                onClick={() => setFocusedSection("strengths")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-400 tracking-[0.5px] uppercase mb-[12px]">
                  Strengths
                </p>
                <div className="space-y-[12px]">
                  {data.strengths.map((item) => (
                    <div key={item.id} className="flex gap-[8px]">
                      <DynamicIcon name={item.icon} size={12} className="text-emerald-600 shrink-0 mt-[2px]" />
                      <div>
                        <p className="font-[family-name:var(--font-inter)] font-semibold text-[11px] text-neutral-800 leading-[1.3]">{item.title}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] text-neutral-500 leading-[1.4] mt-[2px]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.sections.improvements && (
              <div
                className="cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
                onClick={() => setFocusedSection("improvements")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-400 tracking-[0.5px] uppercase mb-[12px]">
                  Areas for improvement
                </p>
                <div className="space-y-[12px]">
                  {data.improvements.map((item) => (
                    <div key={item.id} className="flex gap-[8px]">
                      <DynamicIcon name={item.icon} size={12} className="text-amber-600 shrink-0 mt-[2px]" />
                      <div>
                        <p className="font-[family-name:var(--font-inter)] font-semibold text-[11px] text-neutral-800 leading-[1.3]">{item.title}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] text-neutral-500 leading-[1.4] mt-[2px] whitespace-pre-wrap">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* === OVERALL === */}
        {data.sections.overall && (
          <div
            className="border-t border-neutral-200 pt-[20px] cursor-pointer rounded-lg px-[8px] py-[6px] -mx-[8px] hover:bg-blue-50/50 transition-colors"
            onClick={() => setFocusedSection("overall")}
          >
            <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-400 tracking-[0.5px] uppercase mb-[8px]">
              Overall
            </p>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] text-[11px] text-neutral-600 leading-[1.6]"
              dangerouslySetInnerHTML={{ __html: data.overall.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
