"use client";

import { forwardRef } from "react";
import { EvaluationData } from "@/types/evaluation";
import ClassicLayout from "./layouts/ClassicLayout";
import CompactLayout from "./layouts/CompactLayout";
import MinimalLayout from "./layouts/MinimalLayout";

interface EvaluationPreviewProps {
  data: EvaluationData;
}

const EvaluationPreview = forwardRef<HTMLDivElement, EvaluationPreviewProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="inline-block">
        {data.layout === "classic" && <ClassicLayout data={data} />}
        {data.layout === "compact" && <CompactLayout data={data} />}
        {data.layout === "minimal" && <MinimalLayout data={data} />}
      </div>
    );
  }
);

EvaluationPreview.displayName = "EvaluationPreview";

export default EvaluationPreview;
