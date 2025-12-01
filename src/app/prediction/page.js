"use client";

import { useState } from "react";

export default function PredictPage() {
  const [form, setForm] = useState({
    Age: 30,
    BusinessTravel: "Travel_Rarely",
    DailyRate: 1000,
    Department: "Research & Development",
    DistanceFromHome: 10,
    Education: 3,
    EducationField: "Life Sciences",
    EmployeeCount: 1,
    EmployeeNumber: 1,
    EnvironmentSatisfaction: 3,
    Gender: "Male",
    HourlyRate: 60,
    JobInvolvement: 3,
    JobLevel: 2,
    JobRole: "Research Scientist",
    JobSatisfaction: 3,
    MaritalStatus: "Single",
    MonthlyIncome: 5000,
    MonthlyRate: 15000,
    NumCompaniesWorked: 1,
    Over18: "Y",
    OverTime: "No",
    PercentSalaryHike: 11,
    PerformanceRating: 3,
    RelationshipSatisfaction: 3,
    StandardHours: 80,
    StockOptionLevel: 0,
    TotalWorkingYears: 7,
    TrainingTimesLastYear: 2,
    WorkLifeBalance: 3,
    YearsAtCompany: 4,
    YearsInCurrentRole: 2,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 2,
  });

  const [model, setModel] = useState("best_model");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const numericFields = new Set([
    "Age",
    "DailyRate",
    "DistanceFromHome",
    "Education",
    "EmployeeCount",
    "EmployeeNumber",
    "EnvironmentSatisfaction",
    "HourlyRate",
    "JobInvolvement",
    "JobLevel",
    "JobSatisfaction",
    "MonthlyIncome",
    "MonthlyRate",
    "NumCompaniesWorked",
    "PercentSalaryHike",
    "PerformanceRating",
    "RelationshipSatisfaction",
    "StandardHours",
    "StockOptionLevel",
    "TotalWorkingYears",
    "TrainingTimesLastYear",
    "WorkLifeBalance",
    "YearsAtCompany",
    "YearsInCurrentRole",
    "YearsSinceLastPromotion",
    "YearsWithCurrManager",
  ]);

  const selectOptions = {
    BusinessTravel: ["Non-Travel", "Travel_Rarely", "Travel_Frequently"],
    Department: ["Sales", "Research & Development", "Human Resources"],
    EducationField: [
      "Life Sciences",
      "Other",
      "Medical",
      "Marketing",
      "Technical Degree",
      "Human Resources",
    ],
    Gender: ["Male", "Female"],
    JobRole: [
      "Sales Executive",
      "Research Scientist",
      "Laboratory Technician",
      "Manufacturing Director",
      "Healthcare Representative",
      "Manager",
      "Sales Representative",
      "Research Director",
      "Human Resources",
    ],
    MaritalStatus: ["Single", "Married", "Divorced"],
    Over18: ["Y"],
    OverTime: ["Yes", "No"],
  };

  const modelList = [
    { value: "best_model", label: "Best Model" },
    { value: "Dummy (most_frequent)", label: "Dummy (most_frequent)" },
    { value: "Dummy (stratified)", label: "Dummy (stratified)" },
    { value: "Logistic Regression", label: "Logistic Regression" },
    { value: "KNN", label: "KNN" },
    { value: "Decision Tree", label: "Decision Tree" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.has(name) ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        model_name: model,
        data: form,
      };

      const res = await fetch("http://127.0.0.1:8000/api/predict/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Attrition Prediction</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* MODEL SELECT */}
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm font-medium mb-1">Select Model</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border rounded px-2 py-2"
          >
            {modelList.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        {/* CATEGORICAL FIELDS */}
        {Object.entries(selectOptions).map(([field, options]) => (
          <label key={field} className="flex flex-col">
            <span className="text-sm font-medium mb-1">{field}</span>
            <select
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border rounded px-2 py-2"
            >
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}

        {/* NUMERIC FIELDS */}
        {Array.from(numericFields).map((field) => (
          <label key={field} className="flex flex-col">
            <span className="text-sm font-medium mb-1">{field}</span>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border rounded px-2 py-2"
            />
          </label>
        ))}

        {/* BUTTONS */}
        <div className="md:col-span-2 flex gap-4 items-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border rounded px-3 py-2"
          >
            Reset
          </button>
        </div>
      </form>

      {/* RESULT */}
      <div className="mt-6">
        {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && result.success && (
          <div className="p-4 bg-green-50 border border-green-300 rounded">
            <h3 className="font-bold mb-2 text-lg">Prediction Result</h3>
            <div className="mb-2">
              <span className="font-medium">Model:</span> {result.data.model}
            </div>
            <div className="mb-2">
              <span className="font-medium">Prediction:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  result.data.prediction === 1 ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {result.data.prediction === 1 ? "Will Leave" : "Will Stay"}
              </span>
            </div>

            {result.data.probability && (
              <div className="mt-2">
                <div className="mb-1 font-medium">Probability:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm">Stay (0)</div>
                    <div className="w-full bg-gray-200 rounded h-4">
                      <div
                        className="bg-green-500 h-4 rounded"
                        style={{
                          width: `${result.data.probability[0] * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {(result.data.probability[0] * 100).toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm">Leave (1)</div>
                    <div className="w-full bg-gray-200 rounded h-4">
                      <div
                        className="bg-red-500 h-4 rounded"
                        style={{
                          width: `${result.data.probability[1] * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {(result.data.probability[1] * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
