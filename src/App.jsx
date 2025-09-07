import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SGPAForm from "./pages/SgpaCalculation";
import CGPAForm from "./pages/CgpaCalculation";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="sgpa-calculator" element={<SGPAForm />} />
        <Route path="cgpa-calculator" element={<CGPAForm />} />
      </Routes>
    </div>
  );
};

export default App;
