"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function ExportButton({
  targetRef,
  fileName = "evaluation-summary",
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const captureImage = async (): Promise<string> => {
    if (!targetRef.current) {
      throw new Error("Target element not found");
    }

    return toPng(targetRef.current, {
      pixelRatio: 2,
      backgroundColor: "#f5f5f5",
    });
  };

  const handleExportPng = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const dataUrl = await captureImage();

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export PNG:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const dataUrl = await captureImage();

      const img = new Image();
      img.src = dataUrl;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load captured image"));
      });

      const a4Width = 210;
      const a4Height = 297;
      const margin = 10;

      const availableWidth = a4Width - margin * 2;
      const availableHeight = a4Height - margin * 2;

      const imgAspectRatio = img.width / img.height;
      const pageAspectRatio = availableWidth / availableHeight;

      let pdfWidth: number;
      let pdfHeight: number;

      if (imgAspectRatio > pageAspectRatio) {
        pdfWidth = availableWidth;
        pdfHeight = availableWidth / imgAspectRatio;
      } else {
        pdfHeight = availableHeight;
        pdfWidth = availableHeight * imgAspectRatio;
      }

      const x = margin + (availableWidth - pdfWidth) / 2;
      const y = margin;

      const pdf = new jsPDF("portrait", "mm", "a4");
      pdf.addImage(dataUrl, "PNG", x, y, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <button
        onClick={handleExportPng}
        disabled={isExporting}
        className={`font-jetbrains text-xs uppercase tracking-wide rounded-lg px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors ${
          isExporting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isExporting ? "Exporting..." : "Export PNG"}
      </button>
      <button
        onClick={handleExportPdf}
        disabled={isExporting}
        className={`font-jetbrains text-xs uppercase tracking-wide rounded-lg px-4 py-2 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition-colors ${
          isExporting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isExporting ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
}
