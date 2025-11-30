"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainResult() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/train-model/train-model"
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainResult();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl font-semibold">
        Training models... ⏳
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl text-red-500">
        Error loading training results ❌
      </div>
    );
  }

  // Convert metrics to chart-friendly
  const chartData = Object.entries(data.all_results).map(([name, result]) => ({
    model: name,
    F1: result.val.F1,
    Precision: result.val.Precision,
    Recall: result.val.Recall,
  }));

  const best = data.best_model_metrics;

  return (
    <div className="p-6 space-y-6">
      {/* BEST MODEL */}
      <Card className="shadow-xl border border-black rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            🏆 Best Model:{" "}
            <span className="text-green-600">{data.best_model_name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(best).map(([k, v]) => (
              <div
                key={k}
                className="p-3 bg-gray-100 rounded-xl border border-black"
              >
                <p className="font-semibold">{k}</p>
                <p className="text-lg font-bold">{v.toFixed(4)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ALL MODELS TABLE */}
      <Card className="shadow-xl border border-black rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            📊 All Model Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center border">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border p-2">Model</th>
                  <th className="border p-2">Precision</th>
                  <th className="border p-2">Recall</th>
                  <th className="border p-2">F1</th>
                  <th className="border p-2">ROC-AUC</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.all_results).map(([name, r]) => (
                  <tr key={name} className="border">
                    <td className="border p-2 font-semibold">{name}</td>
                    <td className="border p-2">{r.val.Precision.toFixed(4)}</td>
                    <td className="border p-2">{r.val.Recall.toFixed(4)}</td>
                    <td className="border p-2">{r.val.F1.toFixed(4)}</td>
                    <td className="border p-2">
                      {r.val["ROC-AUC"].toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* F1 SCORE CHART */}
      <Card className="shadow-xl border border-black rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            📈 F1 Score Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[350px]">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="model" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="F1" fill="#4ade80" /> {/* Tailwind Green */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
