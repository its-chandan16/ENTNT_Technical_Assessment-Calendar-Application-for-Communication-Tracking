import "./App.css";
import Admin from "./Admin";
import Calendar from "./Calendar";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
// import Overview from "./components/Overview";
import Header from "./Header";

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/calendar" element={<Calendar />} />
        {/* <Route path="/overview" element={<Overview />} /> */}
      </Routes>
    </>
  );
}

export default App;
