import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHabits } from "../context/useHabits";

export default function AddHabit() {
  const navigate = useNavigate();
  const { addHabit } = useHabits();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    category: false,
    frequency: false,
  });

  const isValid = name.trim() && category && frequency;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    addHabit({
      id: Date.now(),
      name: name.trim(),
      category,
      frequency,
      checkins: [],
      createdAt: new Date().toISOString(),
    });

    alert("Habit added successfully!");
    navigate("/dashboard");
  }

  return (
    <section className="form-section">
      <h1>Add New Habit</h1>
      <p>Create your routine before the streak begins.</p>

      <form className="habit-form" onSubmit={handleSubmit}>
        <label>Habit Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          placeholder="Example: DSA Practice"
        />
        {touched.name && !name.trim() && <small>Habit name is required</small>}

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onBlur={() => setTouched({ ...touched, category: true })}
        >
          <option value="">Select Category</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
          <option value="Productivity">Productivity</option>
          <option value="Fitness">Fitness</option>
          <option value="Custom">Custom</option>
        </select>
        {touched.category && !category && <small>Category is required</small>}

        <label>Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          onBlur={() => setTouched({ ...touched, frequency: true })}
        >
          <option value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Custom">Custom</option>
        </select>
        {touched.frequency && !frequency && <small>Frequency is required</small>}

        <button disabled={!isValid}>Add Habit</button>
      </form>
    </section>
  );
}