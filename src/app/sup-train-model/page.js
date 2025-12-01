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
import { motion } from "framer-motion";

export default function Page() {
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
        console.error("Lấy dữ liệu thất bại:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainResult();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl font-semibold">
        Đang huấn luyện mô hình...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl text-red-500">
        Lỗi khi tải kết quả huấn luyện
      </div>
    );
  }

  const chartData = Object.entries(data.all_results).map(([name, r]) => ({
    model: name,
    F1: r.val.F1,
    Precision: r.val.Precision,
    Recall: r.val.Recall,
    "ROC-AUC": r.val["ROC-AUC"],
  }));

  const best = data.best_model_metrics;

  const renderBarChart = (metric, color, label) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl border border-black rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            📈 {label || metric}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="model" />
                <YAxis />
                <Tooltip formatter={(value) => value.toFixed(4)} />
                <Bar dataKey={metric} fill={color} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl border border-black rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              🏆 Mô hình tốt nhất:{" "}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-xl border border-black rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              📋 Kết quả tất cả mô hình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-center border">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="border p-2">Mô hình</th>
                    <th className="border p-2">Độ chính xác (Precision)</th>
                    <th className="border p-2">Độ nhạy (Recall)</th>
                    <th className="border p-2">F1</th>
                    <th className="border p-2">ROC-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((r) => (
                    <tr key={r.model} className="border">
                      <td className="border p-2 font-semibold">{r.model}</td>
                      <td className="border p-2">{r.Precision.toFixed(4)}</td>
                      <td className="border p-2">{r.Recall.toFixed(4)}</td>
                      <td className="border p-2">{r.F1.toFixed(4)}</td>
                      <td className="border p-2">{r["ROC-AUC"].toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bar charts */}
      <div className="space-y-6">
        {renderBarChart("F1", "#4ade80", "F1")}
        {renderBarChart("Precision", "#60a5fa", "Độ chính xác (Precision)")}
        {renderBarChart("Recall", "#facc15", "Độ nhạy (Recall)")}
        {renderBarChart("ROC-AUC", "#f87171", "ROC-AUC")}
      </div>
    </div>
  );
}
