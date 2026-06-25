import { useNavigate } from "react-router-dom"; 


export default function Home() {
  const navigate = useNavigate();

  const habits = JSON.parse(localStorage.getItem("habits")) || [];

  const totalCheckins = habits.reduce((total, habit) => {
    return total + (habit.checkins ? habit.checkins.length : 0);
  }, 0);

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge"> Habit Track</span>

        <h1>
          Track Daily Habits, <br />
          Build Real Consistency
        </h1>

        <p>
          Stay focused, complete your habits, and grow your streak every 
          day.
        </p>

        <div className="hero-stats">
          <div className="stat-card">
            <h3>0</h3>
            <p>Current Streak</p>
          </div>

          <div className="stat-card">
            <h3>0%</h3>
            <p>Completion Rate</p>
          </div>

          <div className="stat-card pulse">
            <h3>{totalCheckins}</h3>
            <p>Total Check-ins</p>
          </div>
        </div>

        <button className="cta-btn" onClick={() => navigate("/dashboard")}>
          Begin Tracking
        </button>
      </div>

      <div className="hero-right">
        <div className="svg-card">
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="130" cy="130" r="110" className="svg-circle" />
            <rect x="70" y="75" width="120" height="130" rx="18" className="svg-box" />
            <rect x="95" y="105" width="70" height="12" rx="6" className="svg-line" />
            <rect x="95" y="135" width="70" height="12" rx="6" className="svg-line" />
            <rect x="95" y="165" width="70" height="12" rx="6" className="svg-line" />
            <circle cx="82" cy="111" r="8" className="svg-dot" />
            <circle cx="82" cy="141" r="8" className="svg-dot" />
            <circle cx="82" cy="171" r="8" className="svg-dot" />
          </svg>
        </div>
      </div>
    </section>
  );
}