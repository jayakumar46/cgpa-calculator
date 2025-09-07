import { ArrowBigRight, Home } from "lucide-react";
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

function computeSGPA(subjects, withMarks) {
  let totalWeighted = 0,
    totalCredits = 0;
  for (const s of subjects) {
    const credits = Number(s.credits) || 0;
    if (!credits) continue;
    totalCredits += credits;

    let gp = 0;
    if (withMarks) {
      gp =
        s.marks !== "" && s.marks != null
          ? marksToGradePoint(Number(s.marks))
          : 0;
    } else {
      gp =
        s.gradePoint !== "" && s.gradePoint != null ? Number(s.gradePoint) : 0;
    }

    totalWeighted += gp * credits;
  }
  if (totalCredits === 0) return 0;
  return Math.round((totalWeighted / totalCredits) * 100) / 100;
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

  const update = (idx, key, value) => {
    const arr = [...subjects];
    arr[idx][key] = value;
    setSubjects(arr);
  };

  const calculate = (e) => {
    e.preventDefault();
    const result = computeSGPA(subjects, withMarks);
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

        {/* Fancy Toggle Switch */}
        {/* Fancy Toggle Switch */}
        <div className="flex justify-center mt-4">
          <div
            className="relative inline-flex items-center cursor-pointer w-52 h-10 bg-gray-700 rounded-full p-1"
            onClick={() => setWithMarks(!withMarks)}
          >
            {/* Labels */}
            <span
              className={`absolute left-2 text-white font-semibold text-sm transition-colors  ${
                withMarks ? "text-green-400" : "text-white"
              }`}
            >
              With Marks
            </span>
            <span
              className={`absolute right-2 text-white font-semibold text-sm transition-colors ${
                !withMarks ? "text-green-400" : "text-white"
              }`}
            >
              With Grade Points
            </span>

            {/* Sliding Knob */}
            <span
              className={`absolute top-1  h-8 bg-white rounded-full shadow-md transition-transform ${
                withMarks ? "left-1 w-[112px]" : "right-1 w-[120px]"
              }`}
            ></span>
          </div>
        </div>

        <form onSubmit={calculate} className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="uppercase bg-white/10">
                  <th className="p-3 ">Name</th>
                  {withMarks && <th className="p-4 ">Marks</th>}
                  {!withMarks && <th className="p-4 ">Grade Point</th>}
                  <th className="p-3">Credits</th>
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

                    {!withMarks && (
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
                    )}

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
