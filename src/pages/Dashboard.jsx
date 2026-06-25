import { useHabits } from "../context/useHabits";
import { Link } from "react-router-dom";
import PomodoroTimer from "../components/PomodoroTimer";
import Analytics from "../components/Analytics";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "../utils/streakUtils";

export default function Dashboard() {
  const {
    habits,
    toggleCheckin,
    deleteHabit,
    updateHabit,
    freezeToken,
    useFreezeToken,
  } = useHabits();

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((habit) =>
    habit.checkins?.includes(today)
  ).length;

  const progress =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Habits</h1>
          <p>Track your daily consistency and build streaks.</p>
        </div>

        <Link to="/add-habit" className="add-habit-btn">
          + Add Habit
        </Link>
      </div>

      <PomodoroTimer />
      <Analytics/>

     

      <div className="freeze-card">
        <h2>❄️ Weekly Freeze Token</h2>

        {freezeToken?.available ? (
          <>
            <p>You have 1 freeze token available this week.</p>
            <button onClick={useFreezeToken}>Use Freeze Token</button>
          </>
        ) : (
          <p>Freeze token used. Your streak is protected.</p>
        )}
      </div>

      <div className="progress-wrapper">
        <div className="progress-info">
          <span>Today's Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <h2>{habits.length}</h2>
          <p>Total Habits</p>
        </div>

        <div className="stat-box">
          <h2>{completedToday}</h2>
          <p>Completed Today</p>
        </div>

        <div className="stat-box">
          <h2>{progress}%</h2>
          <p>Completion Rate</p>
        </div>
      </div>

      <div className="habit-grid">
        {habits.length === 0 ? (
          <div className="empty-state">
            <h2>No Habits Yet 🚀</h2>
            <p>Create your first habit and start building streaks.</p>

            <Link to="/add-habit" className="add-habit-btn">
              Create Habit
            </Link>
          </div>
        ) : (
          habits.map((habit) => {
            const doneToday = habit.checkins?.includes(today);

            return (
              <div
                className={doneToday ? "habit-card done" : "habit-card"}
                key={habit.id}
              >
                <span className="habit-tag">{habit.category}</span>

                <h2>{habit.name}</h2>

                <p>
                  <strong>Frequency:</strong> {habit.frequency}
                </p>

                <p>
                  <strong>Current Streak:</strong>{" "}
                  {calculateCurrentStreak(habit.checkins || [])} Days
                </p>

                <p>
                  <strong>Longest Streak:</strong>{" "}
                  {calculateLongestStreak(habit.checkins || [])} Days
                </p>

                <button
                  className="check-btn"
                  onClick={() => toggleCheckin(habit.id)}
                >
                  {doneToday ? "Done Today ✅" : "Mark Done Today"}
                </button>

                <button
                  className="edit-btn"
                  onClick={() => {
                    const newName = prompt("Enter new habit name", habit.name);
                    if (newName?.trim()) {
                      updateHabit(habit.id, { name: newName.trim() });
                    }
                  }}
                >
                  Edit Habit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteHabit(habit.id)}
                >
                  Delete Habit
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}