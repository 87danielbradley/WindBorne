import type { HourOffset, Positions } from "../types";

import { balloonAxiosClient } from "./balloonAxiosClient";

export async function fetchBalloons(hourOffset: HourOffset = 0): Promise<Positions> {
  const res = await balloonAxiosClient.get<Positions>(`${HourOffsetToFile(hourOffset)}`);
  return res.data;
}

const HourOffsetToFile = (hourOffset: HourOffset): string => {
  if (hourOffset < 0 || hourOffset > 23) throw new Error("Invalid hour offset");
  return `${String(hourOffset).padStart(2, "0")}.json`;
};
