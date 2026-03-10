import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Navigate to="/" replace />} />
        <Route path="blog" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
