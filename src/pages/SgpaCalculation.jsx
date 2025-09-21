import { ArrowBigRight, Home, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg-2.jpg";

function marksToGradePoint(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 0;
}

export default function SGPAForm() {
  const [subjects, setSubjects] = useState([
    { name: "Subject 1", marks: "", gradePoint: "", credits: 3 },
  ]);
  const [sgpa, setSgpa] = useState(null);
  const [withMarks, setWithMarks] = useState(true);

  const addRow = () =>
    setSubjects([
      ...subjects,
      {
        name: `Subject ${subjects.length + 1}`,
        marks: "",
        gradePoint: "",
        credits: 3,
      },
    ]);

  const removeRow = (idx) => {
    const arr = subjects.filter((_, i) => i !== idx);
    setSubjects(arr);
  };

  const update = (idx, key, value) => {
    const arr = [...subjects];
    arr[idx][key] = value;
    setSubjects(arr);
  };

  const computeSGPA = () => {
    let totalWeighted = 0,
      totalCredits = 0;

    for (const s of subjects) {
      const credits = Number(s.credits) || 0;
      if (!credits) continue;
      totalCredits += credits;

      let gp;
      if (withMarks) {
        gp =
          s.gradePoint !== "" && s.gradePoint != null
            ? Number(s.gradePoint)
            : s.marks !== "" && s.marks != null
            ? marksToGradePoint(Number(s.marks))
            : 0;
      } else {
        gp = Number(s.gradePoint) || 0;
      }

      totalWeighted += gp * credits;
    }

    if (totalCredits === 0) return 0;
    return Math.round((totalWeighted / totalCredits) * 100) / 100;
  };

  const calculate = (e) => {
    e.preventDefault();
    const result = computeSGPA();
    setSgpa(result);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="flex w-full min-h-screen justify-center items-center bg-cover bg-no-repeat relative"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-center text-xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
          🎓 SGPA Calculator
        </h2>

        {/* Toggle Button */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setWithMarks(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              withMarks ? "bg-green-500 text-white" : "bg-white/20 text-white"
            }`}
          >
            With Marks
          </button>
          <button
            onClick={() => setWithMarks(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              !withMarks ? "bg-green-500 text-white" : "bg-white/20 text-white"
            }`}
          >
            Without Marks
          </button>
        </div>

        <form onSubmit={calculate} className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="uppercase bg-white/10">
                  <th className="p-3">Name</th>
                  {withMarks && <th className="p-3">Marks</th>}
                  <th className="p-3">{withMarks ? "Grade Point" : "Grade"}</th>
                  <th className="p-3">Credits</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, i) => (
                  <tr key={i} className="odd:bg-white/5 even:bg-white/10">
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                        value={s.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                        placeholder="Subject Name"
                      />
                    </td>
                    {withMarks && (
                      <td className="p-2">
                        <input
                          className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                          value={s.marks}
                          onChange={(e) => update(i, "marks", e.target.value)}
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Marks"
                        />
                      </td>
                    )}
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                        value={s.gradePoint}
                        onChange={(e) =>
                          update(i, "gradePoint", e.target.value)
                        }
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="GP"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-gray-300 bg-white/20 p-2 w-full outline-none rounded text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 transition"
                        value={s.credits}
                        onChange={(e) => update(i, "credits", e.target.value)}
                        type="number"
                        min="0"
                        placeholder="Credits"
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
              ➕ Add Subject
            </button>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 py-2 px-4 text-white uppercase font-semibold rounded-lg transition transform hover:scale-105"
            >
              ✅ Calculate SGPA
            </button>
          </div>
        </form>

        {sgpa !== null && (
          <div className="mt-6 text-center">
            <div className="bg-green-500/80 text-white font-extrabold text-lg sm:text-2xl py-3 px-5 rounded-lg shadow-lg animate-bounce">
              SGPA: {sgpa}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-white">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Home className="w-5 h-5" />
            HOME
          </Link>
          <Link
            to="/cgpa-calculator"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            CGPA
            <ArrowBigRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
