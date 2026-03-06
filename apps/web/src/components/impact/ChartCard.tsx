"use client";

import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  source?: string;
  asOfDate?: string;
  children: ReactNode;
}

export default function ChartCard({
  title,
  description,
  source,
  asOfDate,
  children,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-5">
      <h4 className="text-sm font-medium text-gray-300 mb-1">{title}</h4>
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}

      {/* Chart area */}
      <div className="mt-3">{children}</div>

      {/* Source attribution */}
      {(source || asOfDate) && (
        <p className="text-[10px] text-gray-600 mt-3">
          {source && <>Source: {source}</>}
          {source && asOfDate && " · "}
          {asOfDate && (
            <>
              As of{" "}
              {new Date(asOfDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </>
          )}
        </p>
      )}
    </div>
  );
}
