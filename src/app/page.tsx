"use client";

import { useRef } from "react";
import { useEvaluationStore } from "@/store/useEvaluationStore";
import EvaluationForm from "@/components/editor/EvaluationForm";
import EvaluationPreview from "@/components/preview/EvaluationPreview";
import ExportButton from "@/components/export/ExportButton";

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  const store = useEvaluationStore();

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Left: Editor */}
      <div className="w-[420px] shrink-0 border-r border-neutral-200 bg-white flex flex-col">
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[16px] text-neutral-800">
              Evaluation Summary
            </h1>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-neutral-400 tracking-[0.3px]">
              MasterBorn — Generator
            </p>
          </div>
          <ExportButton targetRef={previewRef} fileName={store.name.replace(/\s+/g, "-")} />
        </div>
        <div className="flex-1 overflow-hidden">
          <EvaluationForm />
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 overflow-auto p-8 flex items-start justify-center bg-neutral-100">
        <div className="shadow-xl rounded-lg overflow-hidden">
          <EvaluationPreview ref={previewRef} data={store} />
        </div>
      </div>
    </div>
  );
}
