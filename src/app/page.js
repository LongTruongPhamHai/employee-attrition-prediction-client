"use client";

import { motion } from "framer-motion";
import { Activity, Users, Database, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12 w-full mx-auto max-w-4xl py-10">
      <motion.header
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">
          Bảng điều khiển Dự đoán Rủi ro Rời công ty & Phân nhóm Nhân viên
        </h1>
        <p className="text-gray-600 text-lg">
          Dự án áp dụng Học có giám sát (Supervised) & Học không giám sát
          (Unsupervised) để dự đoán nguy cơ nhân viên rời công ty và phân nhóm
          nhân viên.
        </p>
      </motion.header>

      {[
        {
          icon: <Activity size={26} />,
          title: "Mục tiêu dự án",
          content: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Dự đoán khả năng nhân viên rời công ty → Học có giám sát</li>
              <li>
                Phân nhóm nhân viên theo đặc điểm nghề nghiệp, thu nhập, kinh
                nghiệm → Học không giám sát
              </li>
            </ul>
          ),
        },
        {
          icon: <Database size={26} />,
          title: "Tập dữ liệu",
          content: (
            <>
              <p className="text-gray-700">
                IBM HR Analytics Employee Attrition & Performance – Kaggle (1470
                nhân viên, 35 cột)
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Nhãn (Label): Attrition (Yes/No) → Học có giám sát</li>
                <li>
                  Thuộc tính (Feature): Tuổi, Phòng ban, Chức vụ, Thu nhập hàng
                  tháng, Số năm làm việc…
                </li>
              </ul>
            </>
          ),
        },
        {
          icon: <Cpu size={26} />,
          title: "Học có giám sát – Dự đoán nhân viên rời công ty",
          content: (
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                Thuộc tính (Feature): Tuổi, Phòng ban, Chức vụ, Học vấn, Thu
                nhập hàng tháng, Mức độ hài lòng với công việc…
              </li>
              <li>
                Thuật toán: Logistic Regression, KNN, Decision Tree, Dummy
                Classifier
              </li>
              <li>
                Giao diện: Form dự đoán, Ma trận nhầm lẫn (Confusion Matrix),
                ROC-AUC, Tầm quan trọng thuộc tính (Feature Importance)
              </li>
            </ul>
          ),
        },
        {
          icon: <Users size={26} />,
          title: "Học không giám sát – Phân nhóm nhân viên",
          content: (
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                Thuộc tính (Features): Tuổi, Thu nhập hàng tháng, Cấp bậc,
                Khoảng cách đến công ty, Mức độ hài lòng với môi trường…
              </li>
              <li>Thuật toán: K-means / Phân cấp (Hierarchical) / DBSCAN</li>
              <li>Giảm số chiều dữ liệu: PCA / t-SNE / UMAP</li>
              <li>
                Giao diện: Biểu đồ phân tán 2D, mô tả cụm (cluster), thanh trượt
                chọn số cụm
              </li>
            </ul>
          ),
        },
      ].map((sec, i) => (
        <motion.section
          key={i}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Card className="border border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center gap-3 pb-0">
              {sec.icon}
              <CardTitle className="text-2xl">{sec.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-gray-700">
              {sec.content}
            </CardContent>
          </Card>
        </motion.section>
      ))}
    </div>
  );
}
