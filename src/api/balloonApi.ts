import type { Positions } from "../types";
import { balloonAxiosClient } from "./balloonAxiosClient";

export async function fetchBalloons(hourIndex: number = 1): Promise<Positions> {
  const res = await balloonAxiosClient.get<Positions>(`${hourIndexToFile(hourIndex)}`);
  return res.data;
}

const hourIndexToFile = (hourIndex: number): string => {
    if (hourIndex < 0 || hourIndex > 23) {
        throw new Error("Invalid hour index");
    }
    return `${String(hourIndex - 1).padStart(2, "0")}.json`;
};
