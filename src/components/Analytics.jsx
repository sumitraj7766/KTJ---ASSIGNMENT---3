import { useHabits } from "../context/useHabits";

export default function Analytics() {
  const { habits } = useHabits();

  const totalHabits = habits.length;

  const totalCheckins = habits.reduce(
    (sum, habit) => sum + (habit.checkins?.length || 0),
    0
  );

  const completedToday = habits.filter((habit) => {
    const today = new Date().toISOString().split("T")[0];
    return habit.checkins?.includes(today);
  }).length;

  const completionRate =
    totalHabits === 0
      ? 0
      : Math.round((completedToday / totalHabits) * 100);

  const categories = [...new Set(habits.map((habit) => habit.category))];

  return (
    <section className="analytics">
      <div className="analytics-card">
        <h2>{totalHabits}</h2>
        <p>Total Habits</p>
      </div>

      <div className="analytics-card">
        <h2>{completedToday}</h2>
        <p>Completed Today</p>
      </div>

      <div className="analytics-card">
        <h2>{totalCheckins}</h2>
        <p>Total Check-ins</p>
      </div>

      <div className="analytics-card">
        <h2>{completionRate}%</h2>
        <p>Today's Progress</p>
      </div>

      <div className="analytics-card">
        <h2>{categories.length}</h2>
        <p>Categories</p>
      </div>
    </section>
  );
}