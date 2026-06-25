import { useEffect, useState } from "react";
import { HabitContext } from "./HabitContextObject";

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  const [freezeToken, setFreezeToken] = useState(() => {
    return JSON.parse(localStorage.getItem("freezeToken")) || {
      available: true,
      usedAt: null,
    };
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("freezeToken", JSON.stringify(freezeToken));
  }, [freezeToken]);

  function addHabit(habit) {
    setHabits((prev) => [...prev, habit]);
  }

  function updateHabit(id, updatedData) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, ...updatedData } : habit
      )
    );
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }

  function toggleCheckin(id) {
    const today = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.checkins.includes(today);

        return {
          ...habit,
          checkins: alreadyDone
            ? habit.checkins.filter((date) => date !== today)
            : [...habit.checkins, today],
        };
      })
    );
  }

  function useFreezeToken() {
    if (!freezeToken.available) return;

    setFreezeToken({
      available: false,
      usedAt: new Date().toISOString(),
    });
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        toggleCheckin,
        updateHabit,
        freezeToken,
        useFreezeToken,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}