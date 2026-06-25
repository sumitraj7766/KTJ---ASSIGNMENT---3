import { useState } from "react";
import { useHabits } from "../context/useHabits";

export default function ConsistencyGrid() {
  const { habits } = useHabits();
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(habits.map((habit) => habit.category))];

  const filteredHabits =
    category === "All"
      ? habits
      : habits.filter((habit) => habit.category === category);

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  function completedCount(date) {
    return filteredHabits.filter((habit) =>
      habit.checkins?.includes(date)
    ).length;
  }

  const totalCompleted = days.reduce(
    (sum, date) => sum + completedCount(date),
    0
  );

  return (
    <div>
      <h1>Consistency Grid</h1>
      <p>
        {totalCompleted > 10
          ? "Great consistency! Keep your streak alive."
          : "Start small. One habit today can change your future."}
      </p>

      <select
        className="filter-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <div className="heatmap">
        {days.map((date) => {
          const count = completedCount(date);

          return (
            <div
              key={date}
              className={`heat-cell level-${Math.min(count, 4)}`}
              title={`${date}: ${count} habits completed`}
            >
              <span>{new Date(date).getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}