import { ArrowBigLeft, Home, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg-2.jpg";

export default function CGPAForm() {
  const [semesters, setSemesters] = useState([
    { name: "Semester 1", sgpa: "" },
  ]);
  const [cgpa, setCgpa] = useState(null);

  const addRow = () =>
    setSemesters([
      ...semesters,
      {
        name: `Semester ${semesters.length + 1}`,
        sgpa: "",
      },
    ]);

  const removeRow = (idx) => {
    const arr = semesters.filter((_, i) => i !== idx);
    setSemesters(arr);
  };

  const update = (idx, key, value) => {
    const arr = [...semesters];
    arr[idx][key] = value;
    setSemesters(arr);
  };

  const computeCGPA = () => {
    const validSemesters = semesters.filter((s) => s.sgpa !== "");
    const total = validSemesters.reduce((acc, s) => acc + Number(s.sgpa || 0), 0);
    if (validSemesters.length === 0) return 0;
    return total / validSemesters.length; // full decimal, no rounding
  };

  const calculate = (e) => {
    e.preventDefault();
    const result = computeCGPA();
    setCgpa(result);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="flex w-full min-h-screen justify-center items-center bg-cover bg-no-repeat relative"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-center text-xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
          🎓 CGPA Calculator
        </h2>

        <form onSubmit={calculate} className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="uppercase bg-white/10">
                  <th className="p-3">Semester</th>
                  <th className="p-3">SGPA</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((s, i) => (
                  <tr key={i} className="odd:bg-white/5 even:bg-white/10">
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                        value={s.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                        placeholder="Semester Name"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                        value={s.sgpa}
                        onChange={(e) => update(i, "sgpa", e.target.value)}
                        type="number"
                        min="0"
                        max="10"
                        step="any"
                        placeholder="SGPA"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(i)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={addRow}
              className="w-full bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white uppercase font-semibold rounded-lg transition transform hover:scale-105"
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

        {cgpa !== null && (
          <div className="mt-6 text-center">
            <div className="bg-green-500/80 text-white font-extrabold text-lg sm:text-2xl py-3 px-5 rounded-lg shadow-lg animate-bounce">
              CGPA: {cgpa}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-white">
          <Link
            to="/sgpa-calculator"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <ArrowBigLeft className="w-5 h-5" />
            SGPA
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Home className="w-5 h-5" />
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
