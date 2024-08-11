import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import AppRoutes from "./components/AppRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
