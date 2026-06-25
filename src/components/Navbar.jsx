import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">HabitFlow</h2>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={open ? "nav-links active" : "nav-links"}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">My Habits</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/add-habit">Add Habit</NavLink>
        <NavLink to="/consistency">Consistency</NavLink>
      </div>
    </nav>
  );
}