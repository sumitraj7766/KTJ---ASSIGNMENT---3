export default function About() {
  return (
    <div className="about-page">
      <h1>About HabitFlow</h1>

      <div className="about-card">
        <h2>What is this app?</h2>
        <p>
          HabitFlow is a habit tracker and streak dashboard built to help users
          track daily habits, visualize consistency, and stay motivated.
        </p>
      </div>

      <div className="about-card">
        <h2>Tech Stack Used</h2>
        <p>ReactJS, JavaScript, React Router DOM, CSS, Context API, localStorage</p>
      </div>

      <div className="about-card">
        <h2>What I Learned</h2>
        <p>
          I learned routing, state management, form validation, localStorage,
          reusable utilities, dashboard design, and responsive UI development.
        </p>
      </div>

      <div className="about-card meme-card">
        <h2>Fun Note 😄</h2>
        <p>
          One missed habit is not failure. But ignoring JavaScript errors for
          3 hours definitely feels like cardio.
        </p>
      </div>
    </div>
  );
}