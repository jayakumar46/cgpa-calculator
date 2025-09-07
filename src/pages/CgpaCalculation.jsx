import { ArrowBigLeft, Home } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg-3.jpg";

function computeCGPA(semesters) {
  let totalSgpa = 0,
    count = 0;
  for (const s of semesters) {
    if (s.sgpa !== "" && !Number.isNaN(Number(s.sgpa))) {
      totalSgpa += Number(s.sgpa);
      count++;
    }
  }
  if (count === 0) return 0;
  return Math.round((totalSgpa / count) * 100) / 100;
}

export default function CGPAForm() {
  const [semesters, setSemesters] = useState([
    { name: "Semester 1", sgpa: "" },
  ]);
  const [cgpa, setCgpa] = useState(null);

  const addRow = () =>
    setSemesters([
      ...semesters,
      { name: `Semester ${semesters.length + 1}`, sgpa: "" },
    ]);

  const update = (idx, key, value) => {
    const arr = [...semesters];
    arr[idx][key] = value;
    setSemesters(arr);
  };

  const calculate = (e) => {
    e.preventDefault();
    const result = computeCGPA(semesters);
    setCgpa(result);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="flex w-full min-h-screen justify-center items-center bg-cover bg-no-repeat relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-black/70"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-center text-xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
          🎓 CGPA Calculator
        </h2>

        <form onSubmit={calculate} className="mt-6">
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="uppercase bg-white/10">
                  <th className="p-3">Semester</th>
                  <th className="p-3">SGPA</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((s, i) => (
                  <tr key={i} className="odd:bg-white/5 even:bg-white/10">
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                        value={s.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                        placeholder="Semester Name"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                        value={s.sgpa}
                        onChange={(e) => update(i, "sgpa", e.target.value)}
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        placeholder="SGPA"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={addRow}
              className="w-full bg-purple-500 hover:bg-purple-600 py-2 px-4 text-white uppercase font-semibold rounded-lg transition transform hover:scale-105"
            >
              ➕ Add Semester
            </button>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 py-2 px-4 text-white uppercase font-semibold rounded-lg transition transform hover:scale-105"
            >
              ✅ Calculate CGPA
            </button>
          </div>
        </form>

        {/* Result */}
        {cgpa !== null && (
          <div className="mt-6 text-center">
            <div className="bg-purple-500/80 text-white font-extrabold text-lg sm:text-2xl py-3 px-5 rounded-lg shadow-lg animate-bounce">
              CGPA: {cgpa}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-white">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Home className="w-5 h-5" />
            HOME
          </Link>
          <Link
            to="/sgpa-calculator"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <ArrowBigLeft className="w-5 h-5" />
            SGPA
          </Link>
        </div>
      </div>
    </div>
  );
}
