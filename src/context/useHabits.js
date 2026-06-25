import { useContext } from "react";
import { HabitContext } from "./HabitContextObject";

export function useHabits() {
  return useContext(HabitContext);
}