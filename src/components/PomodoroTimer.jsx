import { useEffect, useState } from "react";

export default function PomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("Work");

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setMode((currentMode) =>
            currentMode === "Work" ? "Break" : "Work"
          );

          return mode === "Work" ? 5 * 60 : 25 * 60;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, mode]);

  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  function resetTimer() {
    setRunning(false);
    setMode("Work");
    setSeconds(25 * 60);
  }

  return (
    <div className="pomodoro-card">
      <h2>Pomodoro Timer</h2>
      <p>{mode} Session</p>

      <div className="timer">
        {minutes.toString().padStart(2, "0")}:
        {sec.toString().padStart(2, "0")}
      </div>

      <div className="timer-actions">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}