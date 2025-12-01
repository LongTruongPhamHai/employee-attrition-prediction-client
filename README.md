# Employee Attrition Prediction - Next.js Client

Đây là dự án **Next.js** được khởi tạo bằng [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) dành cho giao diện client của ứng dụng dự đoán nhân viên rời công ty.

Dự án sử dụng:

- [TailwindCSS](https://tailwindcss.com/) để thiết kế giao diện responsive.
- [Framer Motion](https://www.framer.com/motion/) cho các hiệu ứng animation mượt mà.
- [Lucide Icons](https://lucide.dev/) để hiển thị icon trực quan.
- [Shadcn UI](https://ui.shadcn.com/) cho các component UI tái sử dụng.

---

## Bắt đầu

Chạy server phát triển:

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem kết quả.

Bạn có thể chỉnh sửa các trang trong thư mục `src/app/`. Trang sẽ tự động cập nhật khi lưu thay đổi.

---

## Tính năng chính

1. **Tổng quan dữ liệu**

   - Thống kê dataset IBM HR Analytics: số cột theo kiểu dữ liệu, giá trị thiếu, phân phối lớp Attrition, boxplot các biến số.

2. **Huấn luyện mô hình**

   - Hiển thị kết quả huấn luyện các mô hình Machine Learning: Logistic Regression, KNN, Decision Tree…
   - So sánh các metric: Precision, Recall, F1, ROC-AUC.
   - Hiển thị mô hình tốt nhất.

3. **Dự đoán nhân viên**

   - Cho phép nhập dữ liệu nhân viên và chọn mô hình để dự đoán khả năng rời công ty.
   - Hiển thị kết quả dự đoán: `Will Stay` / `Will Leave`.
   - Biểu diễn xác suất dự đoán trực quan bằng thanh tiến trình.

---

## Học hỏi thêm

- [Next.js Documentation](https://nextjs.org/docs) – tìm hiểu chi tiết về API và tính năng của Next.js.
- [Learn Next.js](https://nextjs.org/learn) – hướng dẫn tương tác giúp làm quen nhanh với Next.js.

---

## Triển khai trên Vercel

Cách dễ nhất để triển khai ứng dụng Next.js là sử dụng [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Xem thêm [hướng dẫn triển khai Next.js](https://nextjs.org/docs/app/building-your-application/deploying) để biết chi tiết.

---

## Cấu trúc thư mục

```
client/
├── .next/                     # Thư mục build Next.js
├── node_modules/              # Thư viện npm
├── public/                    # Hình ảnh, favicon, icon tĩnh
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── app/                    # Các route/pages
│   │   ├── about-dataset/      # Trang tổng quan dữ liệu
│   │   │   └── page.js
│   │   ├── prediction/         # Trang dự đoán nhân viên
│   │   │   └── page.js
│   │   ├── sup-train-model/    # Huấn luyện mô hình có giám sát
│   │   │   └── page.js
│   │   ├── unsup-train-model/  # Huấn luyện mô hình không giám sát
│   │   │   └── page.js
│   │   ├── components/         # Các component dùng chung trong app
│   │   │   └── FloatBtn.js / SideMenu.js / ...
│   │   ├── global.css          # CSS toàn cục (Tailwind)
│   │   ├── layout.js           # Layout gốc, navbar, side menu
│   │   └── page.js             # Trang home / dashboard
│   ├── components/             # Components lớn dùng nhiều nơi
│   │   └── ui/                 # Shadcn UI components
│   │       ├── Card.js
│   │       ├── Button.js
│   │       └── ...
│   └── lib/                    # Thư viện, helpers, config
│       ├── menu.js
│       └── utils.js
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jsconfig.json / tsconfig.json
└── README.md
```
