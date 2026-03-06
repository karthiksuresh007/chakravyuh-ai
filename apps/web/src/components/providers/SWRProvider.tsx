"use client";

import { SWRConfig } from "swr";
import { apiFetcher } from "@/lib/api/fetcher";

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: apiFetcher,
        revalidateOnFocus: false,
        dedupingInterval: 60_000,   // dedupe identical requests within 60s
        errorRetryCount: 2,
      }}
    >
      {children}
    </SWRConfig>
  );
}
