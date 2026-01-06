import type { HourOffset, Positions } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchBalloons } from "../api";
import { useEffect } from "react";

export function useBalloons(hourOffset: HourOffset) {
  return useQuery<Positions, Error>({
    queryKey: ["balloons", hourOffset],
    queryFn: () => fetchBalloons(hourOffset),
    enabled: hourOffset >= 0 && hourOffset <= 23,
    staleTime: hourOffset === 0 ? 0 : Infinity,
    gcTime: 24 * 60 * 60 * 1000
  });
}

export function usePrefetchBalloons24h() {
  const qc = useQueryClient();

  useEffect(() => {
    for (let h = 0; h < 24; h++) {
      qc.prefetchQuery({
        queryKey: ["balloons", h],
        queryFn: () => fetchBalloons(h),
        staleTime: 5 * 60 * 1000
      });
    }
  }, [qc]);
}

export function useRefreshCurrentFrame(intervalMs = 60_000) {
  const qc = useQueryClient();

  useEffect(() => {
    const id = window.setInterval(() => {
      qc.invalidateQueries({ queryKey: ["balloons", 0] });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [qc, intervalMs]);
}