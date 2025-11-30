"use client";

import { useEffect, useState } from "react";
import { Database, Cpu, Users, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  ErrorBar,
  Rectangle,
  Layer,
  Candle,
  Line,
  CartesianGrid,
} from "recharts";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function page() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/overview-data/overview"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log("Get data failed! Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data)
    return (
      <div className="flex justify-center items-center h-full text-3xl">
        Loading...
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
    <div className="flex flex-col items-center gap-5">
      <header className="text-center">
        <h1 className="text-4xl font-bold">
          IBM HR Analytics Employee Attrition & Performance
        </h1>
        <p className="text-gray-600 text-lg">
          Dataset mô phỏng thông tin nhân viên để phân tích Attrition &
          Performance
        </p>
        <p>
          Nguồn:{" "}
          <a
            href="https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset"
            target="blank"
            className="text-blue-600 underline"
          >
            Kaggle
          </a>
        </p>
      </header>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          1. Giới thiệu dataset
        </h2>
        <p className="text-gray-700">
          Dataset được tạo bởi các nhà khoa học dữ liệu của IBM nhằm phân tích
          và dự đoán nhân viên rời công ty (attrition) và khám phá các yếu tố
          liên quan đến hiệu suất, sự hài lòng và đặc điểm nghề nghiệp. Dữ liệu
          là <strong>giả lập</strong> nhưng mô phỏng sát thực tế.
        </p>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          2. Mục đích sử dụng
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            Dự đoán khả năng nhân viên rời công ty (Attrition Prediction –
            supervised learning)
          </li>
          <li>
            Phân nhóm nhân viên theo đặc điểm nghề nghiệp và hành vi (Employee
            Segmentation – unsupervised learning)
          </li>
          <li>
            Trả lời các câu hỏi phân tích, ví dụ:
            <ul className="list-disc pl-5 space-y-1">
              <li>
                So sánh khoảng cách từ nhà đến công ty theo Job Role và
                Attrition
              </li>
              <li>
                So sánh mức lương trung bình theo trình độ học vấn và Attrition
              </li>
              <li>
                Nhóm nhân viên theo thu nhập, tuổi, JobSatisfaction và
                YearsAtCompany
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="overflow-hidden w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          3. Các đặc trưng (features)
        </h2>
        <div className="overflow-auto w-full">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Feature</th>
                <th className="px-4 py-2 border">Kiểu</th>
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
                [
                  "BusinessTravel",
                  "Categorical",
                  "Tần suất đi công tác (Non-Travel / Travel_Rarely / Travel_Frequently)",
                ],
                ["DailyRate", "Numeric", "Lương theo ngày"],
                [
                  "Department",
                  "Categorical",
                  "Bộ phận làm việc (Sales, R&D, HR)",
                ],
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

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          4. Các giá trị mã hóa quan trọng
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            Education: 1=Below College, 2=College, 3=Bachelor, 4=Master,
            5=Doctor
          </li>
          <li>
            EnvironmentSatisfaction / JobInvolvement / JobSatisfaction /
            RelationshipSatisfaction: 1=Low → 4=Very High
          </li>
          <li>PerformanceRating: 1=Low, 2=Good, 3=Excellent, 4=Outstanding</li>
          <li>WorkLifeBalance: 1=Bad, 2=Good, 3=Better, 4=Best</li>
        </ul>
        <p className="text-gray-600">
          Các biến Ordinal có thể dùng trực tiếp cho ML hoặc chuyển thành dummy
          variables nếu cần.
        </p>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          5. Ứng dụng gợi ý
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            Supervised Learning: Logistic Regression, Decision Tree, Random
            Forest → dự đoán Attrition
          </li>
          <li>
            Unsupervised Learning: K-means, Hierarchical Clustering → phân nhóm
            nhân viên
          </li>
          <li>
            Visualization: Biểu đồ phân phối Age, MonthlyIncome, YearsAtCompany
            theo Attrition hoặc JobRole; PCA / t-SNE trực quan các cluster
          </li>
        </ul>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          6. Tổng quan dữ liệu
        </h2>
        <section className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Số cột theo kiểu dữ liệu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dtypeData}>
              <XAxis dataKey="dtype" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Số giá trị thiếu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={missingData}>
              <XAxis dataKey="column" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="missing" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Thống kê mô tả (Boxplot)</h2>
          <Plot
            data={boxplotTraces}
            layout={{
              yaxis: { title: "Values" },
              xaxis: { tickangle: -45 },
              height: 500,
              margin: { t: 20, b: 100 },
              showlegend: false,
            }}
            style={{ width: "100%" }}
          />
        </section>

        <section className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Phân phối lớp</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.target_distribution}>
              <XAxis dataKey="Attrition" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Count">
                {data.target_distribution.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={entry.Attrition === "Yes" ? "#f87171" : "#4ade80"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </section>
      <section className="w-full space-y-3"></section>
      <section className="w-full space-y-3"></section>
      <section className="w-full space-y-3"></section>
      <section className="w-full space-y-3"></section>
    </div>
  );
}
