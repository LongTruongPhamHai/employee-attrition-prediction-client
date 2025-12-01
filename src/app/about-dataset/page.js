"use client";

import { useEffect, useState } from "react";
import { Database, Cpu, Users, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Page() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/overview-data/overview"
      );
      if (!res.ok) throw new Error("Lấy dữ liệu thất bại!");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Lấy dữ liệu thất bại: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-3xl">
        Đang tải dữ liệu...
      </div>
    );

  const dtypeCounts = {};
  Object.values(data.dtypes).forEach((dtype) => {
    dtypeCounts[dtype] = (dtypeCounts[dtype] || 0) + 1;
  });
  const dtypeData = Object.entries(dtypeCounts).map(([dtype, count]) => ({
    dtype,
    count,
  }));

  const missingData = data.missing_values.map((row) => ({
    column: row.column,
    missing: row["Null Count"],
  }));

  const numericCols = Object.keys(data.describe[0]).filter(
    (col) => col !== "index"
  );
  const boxplotTraces = numericCols.map((col) => {
    const colStats = {};
    data.describe.forEach((d) => {
      colStats[d.index] = d[col];
    });
    return {
      y: [
        colStats.min,
        colStats["25%"],
        colStats["50%"],
        colStats["75%"],
        colStats.max,
      ],
      type: "box",
      name: col,
      boxpoints: false,
      line: { color: "#4ade80" },
      fillcolor: "#d1fae5",
      marker: { size: 4 },
    };
  });

  return (
    <div className="space-y-12 w-full mx-auto max-w-6xl py-10 px-4">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl font-bold">
          Tổng quan Dataset IBM HR Analytics
        </h1>
        <p className="text-gray-600 text-lg">
          Dữ liệu mô phỏng thông tin nhân viên để phân tích Attrition &
          Performance
        </p>
        <p>
          Nguồn:{" "}
          <a
            href="https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset"
            target="_blank"
            className="text-blue-600 underline"
          >
            Kaggle
          </a>
        </p>
      </motion.header>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          1. Giới thiệu dataset
        </h2>
        <p className="text-gray-700">
          Dataset được tạo bởi các nhà khoa học dữ liệu của IBM nhằm phân tích
          và dự đoán nhân viên rời công ty (attrition) và khám phá các yếu tố
          liên quan đến hiệu suất, sự hài lòng và đặc điểm nghề nghiệp. Dữ liệu
          là <strong>giả lập</strong> nhưng sát với thực tế.
        </p>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          2. Mục đích sử dụng
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Dự đoán khả năng nhân viên rời công ty (Học có giám sát)</li>
          <li>
            Phân nhóm nhân viên theo đặc điểm nghề nghiệp và hành vi (Học không
            giám sát)
          </li>
          <li>
            Phân tích câu hỏi dữ liệu ví dụ:
            <ul className="list-disc pl-5 space-y-1">
              <li>
                So sánh khoảng cách từ nhà đến công ty theo Job Role và
                Attrition
              </li>
              <li>
                So sánh thu nhập trung bình theo trình độ học vấn và Attrition
              </li>
              <li>
                Nhóm nhân viên theo thu nhập, tuổi, JobSatisfaction và
                YearsAtCompany
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          3. Các đặc trưng (features)
        </h2>
        <div className="overflow-auto w-full">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Thuộc tính</th>
                <th className="px-4 py-2 border">Kiểu dữ liệu</th>
                <th className="px-4 py-2 border">Mô tả</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                ["Age", "Numeric", "Tuổi của nhân viên"],
                [
                  "Attrition",
                  "Categorical",
                  "Nhân viên rời công ty hay không (Yes/No)",
                ],
                ["BusinessTravel", "Categorical", "Tần suất đi công tác"],
                ["DailyRate", "Numeric", "Lương theo ngày"],
                ["Department", "Categorical", "Bộ phận làm việc"],
                [
                  "DistanceFromHome",
                  "Numeric",
                  "Khoảng cách từ nhà đến công ty (km)",
                ],
                [
                  "Education",
                  "Ordinal",
                  "Trình độ học vấn (1=Below College → 5=Doctor)",
                ],
                [
                  "EnvironmentSatisfaction",
                  "Ordinal",
                  "Mức độ hài lòng với môi trường làm việc (1=Low → 4=Very High)",
                ],
                [
                  "JobInvolvement",
                  "Ordinal",
                  "Mức độ tham gia công việc (1=Low → 4=Very High)",
                ],
                ["JobLevel", "Numeric", "Cấp bậc công việc"],
                ["JobRole", "Categorical", "Vị trí công việc"],
                [
                  "JobSatisfaction",
                  "Ordinal",
                  "Mức độ hài lòng với công việc (1=Low → 4=Very High)",
                ],
                ["MaritalStatus", "Categorical", "Tình trạng hôn nhân"],
                ["MonthlyIncome", "Numeric", "Lương hàng tháng"],
                [
                  "NumCompaniesWorked",
                  "Numeric",
                  "Số công ty đã làm trước đây",
                ],
                [
                  "OverTime",
                  "Categorical",
                  "Có làm thêm giờ hay không (Yes/No)",
                ],
                ["PercentSalaryHike", "Numeric", "Tỷ lệ tăng lương (%)"],
                ["PerformanceRating", "Ordinal", "1=Low → 4=Outstanding"],
                ["RelationshipSatisfaction", "Ordinal", "1=Low → 4=Very High"],
                ["StockOptionLevel", "Numeric", "Cấp độ quyền chọn cổ phiếu"],
                ["TotalWorkingYears", "Numeric", "Tổng số năm kinh nghiệm"],
                [
                  "TrainingTimesLastYear",
                  "Numeric",
                  "Số lần đào tạo năm trước",
                ],
                ["WorkLifeBalance", "Ordinal", "1=Bad → 4=Best"],
                ["YearsAtCompany", "Numeric", "Số năm làm tại công ty"],
                ["YearsInCurrentRole", "Numeric", "Số năm ở vị trí hiện tại"],
                [
                  "YearsSinceLastPromotion",
                  "Numeric",
                  "Số năm kể từ lần thăng chức gần nhất",
                ],
                [
                  "YearsWithCurrManager",
                  "Numeric",
                  "Số năm làm việc với quản lý hiện tại",
                ],
              ].map(([feature, type, desc], idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 border">{feature}</td>
                  <td className="px-4 py-2 border">{type}</td>
                  <td className="px-4 py-2 border">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="w-full space-y-6 pt-5">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Cpu size={28} className="text-green-600" /> Tổng quan dữ liệu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Database size={22} className="text-blue-600" />
                  Số cột theo kiểu dữ liệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={dtypeData}>
                    <XAxis dataKey="dtype" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle size={22} className="text-red-500" />
                  Số giá trị thiếu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={missingData}>
                    <XAxis dataKey="column" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="missing"
                      fill="#dc2626"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl shadow-md sm:p-4">
            <CardHeader>
              <CardTitle className="text-xl">
                Thống kê mô tả (Boxplot)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Plot
                data={boxplotTraces}
                layout={{
                  yaxis: { title: "Giá trị" },
                  xaxis: { tickangle: -45 },
                  height: 480,
                  margin: { t: 20, b: 100 },
                  showlegend: false,
                }}
                style={{ width: "100%" }}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-xl">
                Phân phối lớp (Attrition)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.target_distribution}>
                  <XAxis dataKey="Attrition" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Count" radius={[6, 6, 0, 0]}>
                    {data.target_distribution.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={entry.Attrition === "Yes" ? "#dc2626" : "#16a34a"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
