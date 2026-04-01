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

export default function ClassicLayout({ data }: { data: EvaluationData }) {
  const { setFocusedSection } = useEvaluationStore();
  const badgeStyle = BADGE_COLORS[data.badge.color] || BADGE_COLORS.cyan;

  const ratingPercent = data.rating.maxScore > 0 ? data.rating.score / data.rating.maxScore : 0;
  const fullBars = Math.floor(ratingPercent * 4);
  const partialWidth = ((ratingPercent * 4) - fullBars) * 100;

  return (
    <div
      className="bg-neutral-100 flex items-center px-[14px] py-[24px] w-[595px]"
      style={{ fontFeatureSettings: "'ss01' on" }}
    >
      <div className="flex flex-col gap-[12px] items-start w-[567px]">
        {/* === HEADER === */}
        <div
          className="flex gap-[18px] items-center pb-[16px] w-full cursor-pointer rounded-xl hover:bg-blue-50/40 transition-colors"
          onClick={() => setFocusedSection("profil")}
        >
          {/* Photo */}
          <div className="rounded-[20px] w-[93.26px] h-[93.26px] overflow-hidden shrink-0 bg-neutral-200">
            {data.photo ? (
              <img
                src={data.photo}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <DynamicIcon name="User" size={40} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-[16px] flex-1 min-w-0">
            {/* Name + Badge */}
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[170px]">
                <p className="font-[family-name:var(--font-space-grotesk)] font-medium text-[18px] text-neutral-800 uppercase leading-normal">
                  {data.name}
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] font-semibold text-[12px] text-neutral-500 leading-normal">
                  {data.title}
                </p>
              </div>
              <div
                className={`${badgeStyle.bg} flex items-center justify-center px-[10px] py-[3px] rounded-[10px]`}
              >
                <p
                  className={`font-[family-name:var(--font-jetbrains)] font-bold text-[10px] ${badgeStyle.text} tracking-[0.4px] whitespace-nowrap leading-normal`}
                >
                  {data.badge.text}
                </p>
              </div>
            </div>

            {/* Metadata row */}
            <div className="flex gap-[10px] items-center w-full">
              <div className="flex flex-col gap-[2px] w-[169px]">
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] leading-normal">
                  W MB OD
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[12px] text-neutral-800 leading-normal">
                  {data.mbSince}
                </p>
              </div>
              <div className="flex flex-col gap-[2px] w-[169px]">
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] leading-normal">
                  AWANS
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[12px] text-neutral-800 leading-normal">
                  {data.promotionDate}
                </p>
              </div>
              <div className="flex flex-col gap-[2px] flex-1 items-end text-right">
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] leading-normal w-full">
                  EWALUACJA
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] font-medium text-[12px] text-neutral-800 leading-normal w-full">
                  {data.evaluationType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === RATING + PROMOTION ROW === */}
        {(data.sections.rating || data.sections.promotion) && (
          <div className="flex gap-[12px] items-stretch w-full">
            {/* Rating card */}
            {data.sections.rating && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[10px] flex-1 p-[16px] rounded-[12px] min-h-[124px] cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("rating")}
              >
                <div className="flex items-start justify-between w-full whitespace-nowrap">
                  <div className="flex flex-col font-[family-name:var(--font-jetbrains)] font-bold text-[10px]">
                    <p className="text-neutral-500 tracking-[0.4px] leading-normal">RATING</p>
                    <p className="text-neutral-800 uppercase leading-normal">
                      {data.rating.respondents} Respondentów
                    </p>
                  </div>
                  <div className="flex gap-[4px] items-end uppercase">
                    <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[18px] text-neutral-800">
                      {data.rating.score}
                    </p>
                    <p className="font-[family-name:var(--font-space-grotesk)] font-medium text-[12px] text-neutral-500">
                      /{data.rating.maxScore}
                    </p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="flex gap-[4px] h-[6px] w-full">
                  {Array.from({ length: 4 }).map((_, i) => {
                    if (i < fullBars) {
                      return (
                        <div
                          key={i}
                          className="bg-emerald-500 flex-1 h-[6px] rounded-[4px]"
                        />
                      );
                    }
                    if (i === fullBars && partialWidth > 0) {
                      return (
                        <div
                          key={i}
                          className="bg-emerald-100 flex-1 h-[6px] rounded-[4px] overflow-hidden flex flex-col"
                        >
                          <div
                            className="bg-emerald-500 h-[6px] rounded-[4px]"
                            style={{ width: `${partialWidth}%` }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className="bg-emerald-100 flex-1 h-[6px] rounded-[4px]"
                      />
                    );
                  })}
                </div>
                <div
                  className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 leading-[1.4] w-full"
                  dangerouslySetInnerHTML={{ __html: data.rating.comment }}
                />
              </div>
            )}

            {/* Promotion card */}
            {data.sections.promotion && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[10px] flex-1 p-[16px] rounded-[12px] min-h-[124px] cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("awans")}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col font-[family-name:var(--font-jetbrains)] font-bold text-[10px] whitespace-nowrap">
                    <p className="text-neutral-500 tracking-[0.4px] leading-normal">AWANS?</p>
                  </div>
                </div>
                <div
                  className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 w-full leading-[1.4]"
                  dangerouslySetInnerHTML={{ __html: data.promotion.content }}
                />
              </div>
            )}
          </div>
        )}

        {/* === DELTA === */}
        {data.sections.delta && data.delta && (
          <div
            className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[10px] p-[16px] rounded-[12px] w-full cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            onClick={() => setFocusedSection("delta")}
          >
            <div className="flex items-start justify-between w-full">
              <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] whitespace-nowrap leading-normal">
                DELTA
              </p>
            </div>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 w-full leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: data.delta }}
            />
          </div>
        )}

        {/* === STRENGTHS + IMPROVEMENTS === */}
        {(data.sections.strengths || data.sections.improvements) && (
          <div className="flex gap-[12px] items-start w-full">
            {/* Strengths */}
            {data.sections.strengths && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[16px] flex-1 p-[16px] rounded-[12px] self-stretch cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("strengths")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] uppercase whitespace-nowrap leading-normal">
                  Strengths
                </p>
                {data.strengths.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-[4px] w-full"
                  >
                    <div className="flex gap-[6px] items-center w-full">
                      <DynamicIcon
                        name={item.icon}
                        size={14}
                        className="text-emerald-600 shrink-0"
                      />
                      <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-800 uppercase leading-[1.4] flex-1">
                        {item.title}
                      </p>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 leading-[1.4] tracking-[-0.2px] w-full">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Improvements */}
            {data.sections.improvements && (
              <div
                className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[16px] flex-1 p-[16px] rounded-[12px] self-stretch cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                onClick={() => setFocusedSection("improvements")}
              >
                <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] uppercase whitespace-nowrap leading-normal">
                  Areas for improvement
                </p>
                {data.improvements.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-[4px] w-full"
                  >
                    <div className="flex gap-[6px] items-center w-full">
                      <DynamicIcon
                        name={item.icon}
                        size={14}
                        className="text-amber-600 shrink-0"
                      />
                      <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-800 uppercase leading-[1.4] flex-1">
                        {item.title}
                      </p>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 leading-[1.4] tracking-[-0.2px] w-full whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === OVERALL === */}
        {data.sections.overall && (
          <div
            className="bg-neutral-50 border border-neutral-200 flex flex-col gap-[10px] p-[16px] rounded-[12px] w-full cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            onClick={() => setFocusedSection("overall")}
          >
            <p className="font-[family-name:var(--font-jetbrains)] font-bold text-[10px] text-neutral-500 tracking-[0.4px] whitespace-nowrap leading-normal">
              OVERALL
            </p>
            <div
              className="rich-preview font-[family-name:var(--font-inter)] font-medium text-[10px] text-neutral-600 leading-[1.6] w-full"
              dangerouslySetInnerHTML={{ __html: data.overall.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
