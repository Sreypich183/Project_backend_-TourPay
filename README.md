# 🧾 TourPay Backend

TourPay is a collaborative expense-sharing platform built for group trips and shared tours. This backend powers all the APIs, authentication, tour expense logic, and user management for the platform.

---

## 🧱 Project Structure 
TourPay/
├── backend/            ← Your existing Node + Express + PostgreSQL + Sequelize API
│   └── (already extracted)
├── frontend/           ← New React 18 + Vite + Tailwind + Redux frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── components/
│   │   ├── services/   ← Axios + RTK Query config
│   │   └── App.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md           ← Root-level README
└── package.json        ← Shared setup (optional)
