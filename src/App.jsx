import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import ConsistencyGrid from "./pages/ConsistencyGrid";
import About from "./pages/About";




function NotFound() {
  return <h1>404 Page Not Found</h1>;
}

export default function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-habit" element={<AddHabit />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/consistency" element={<ConsistencyGrid />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </main>
    </>
  );
}