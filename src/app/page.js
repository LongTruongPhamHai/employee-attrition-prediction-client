"use client";

import { Activity, Users, Database, Cpu } from "lucide-react";

export default function page() {
  return (
    <div className="space-y-12 w-full mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Employee Attrition & Segmentation Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Dự án áp dụng Supervised & Unsupervised Learning để dự đoán rủi ro
          nhân viên rời công ty và phân nhóm nhân viên
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Activity size={24} /> Mục tiêu dự án
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Dự đoán khả năng nhân viên rời công ty → Supervised Learning</li>
          <li>
            Phân nhóm nhân viên theo đặc điểm nghề nghiệp, thu nhập, kinh nghiệm
            → Unsupervised Learning
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Database size={24} /> Tập dữ liệu
        </h2>
        <p className="text-gray-700">
          IBM HR Analytics Employee Attrition & Performance – Kaggle (1470 nhân
          viên, 35 cột)
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Label: Attrition (Yes/No) → dùng cho Supervised Learning</li>
          <li>
            Các feature khác: Age, Department, JobRole, MonthlyIncome,
            YearsAtCompany… dùng cho Unsupervised Learning
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Cpu size={24} /> Supervised Learning (Học có giám sát) – Predict
          Attrition
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>
            Đặc trưng: Age, Department, JobRole, Education, MonthlyIncome,
            YearsAtCompany, JobSatisfaction…
          </li>
          <li>
            Thuật toán: Dummy Classification, Logistic Regression, KNN, Decision
            Tree Classification.
          </li>
          <li>
            Output UI: Form nhập thông tin nhân viên → dự đoán khả năng rời công
            ty, biểu đồ Confusion Matrix, ROC-AUC, Feature Importance
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users size={24} /> Unsupervised Learning (Học không giám sát) –
          Employee Segmentation
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>
            Features: Age, MonthlyIncome, YearsAtCompany, JobLevel, JobRole,
            DistanceFromHome, EnvironmentSatisfaction
          </li>
          <li>Algorithms: K-means / Hierarchical / DBSCAN</li>
          <li>Dimensionality reduction: PCA / t-SNE / UMAP</li>
          <li>
            Output UI: Scatter plot 2D, mô tả cluster (Avg Income, Attrition
            rate,…), slider chọn số cluster k
          </li>
        </ul>
      </section>
    </div>
  );
}
