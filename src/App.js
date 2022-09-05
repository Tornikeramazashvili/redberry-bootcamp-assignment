import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Landing from "./pages/landing/Landing";
import EmployeeInformation from "./pages/emloyeeInformation/EmployeeInformation";
import LaptopInformation from "./pages/emloyeeInformation/laptopInformation/LaptopInformation";
import EntriesList from "./pages/entriesList/EntriestList";
import EntriesListDetailed from "./pages/entriesListDetailed/EntriesListDetailed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/redberry-bootcamp-assignment" element={<Landing />} />
        <Route path="/employeeInformation" element={<EmployeeInformation />} />
        <Route path="/laptopInformation" element={<LaptopInformation />} />
        <Route path="/entriesList" element={<EntriesList />} />
        <Route path="/entriesListDetailed" element={<EntriesListDetailed />} />
      </Routes>
    </Router>
  );
}

export default App;
