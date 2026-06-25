import { useHabits } from "../context/useHabits";
import { calculateMomentum } from "../utils/momentumUtils";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "../utils/streakUtils";

export default function Insights() {
  const { habits } = useHabits();

  const totalCheckins = habits.reduce(
    (sum, habit) => sum + (habit.checkins?.length || 0),
    0
  );

  const bestHabit = habits.reduce((best, habit) => {
    if (!best) return habit;
    return (habit.checkins?.length || 0) > (best.checkins?.length || 0)
      ? habit
      : best;
  }, null);

  function getSevenDayRate(checkins = []) {
    let completed = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      if (checkins.includes(dateString)) {
        completed++;
      }
    }

    return Math.round((completed / 7) * 100);
  }

  const overallLongestStreak = habits.length
    ? Math.max(
        ...habits.map((habit) =>
          calculateLongestStreak(habit.checkins || [])
        )
      )
    : 0;

  return (
    <div className="insights">
      <h1>Insights</h1>
      <p>Analyze your habit progress and consistency.</p>

      <div className="stats-grid">
        <div className="stat-box">
          <h2>{habits.length}</h2>
          <p>Total Habits</p>
        </div>

        <div className="stat-box">
          <h2>{totalCheckins}</h2>
          <p>Total Check-ins</p>
        </div>

        <div className="stat-box">
          <h2>{overallLongestStreak}</h2>
          <p>Longest Streak</p>
        </div>
      </div>

      {bestHabit && (
        <div className="best-habit">
          <h2>🏆 Best Habit</h2>
          <h3>{bestHabit.name}</h3>
          <p>{bestHabit.checkins?.length || 0} total check-ins</p>
        </div>
      )}

      <div className="habit-grid">
        {habits.map((habit) => {
          const momentum = calculateMomentum(habit.checkins || []);
          const sevenDayRate = getSevenDayRate(habit.checkins || []);

          return (
            <div className="habit-card" key={habit.id}>
              <span className="habit-tag">{habit.category}</span>

              <h2>{habit.name}</h2>

              <p>
                Current Streak:{" "}
                {calculateCurrentStreak(habit.checkins || [])} Days
              </p>

              <p>
                Longest Streak:{" "}
                {calculateLongestStreak(habit.checkins || [])} Days
              </p>

              <p>7-Day Completion Rate: {sevenDayRate}%</p>

              <div className="momentum-box">
                <p>Habit Momentum: {momentum} / 100</p>

                <div className="momentum-bar">
                  <div
                    className="momentum-fill"
                    style={{ width: `${momentum}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}