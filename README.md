# 🧾 TourPay Backend

TourPay is a collaborative expense-sharing platform built for group trips and shared tours. This backend powers all the APIs, authentication, tour expense logic, and user management for the platform.

---
## ⚙️ Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | React 18, Vite, Redux Toolkit, Tailwind CSS |
| Backend   | Node.js, Express.js, JWT               |
| Database  | PostgreSQL with Sequelize ORM          |
| Storage   | Cloudinary (optional media uploads)    |
| Auth      | JWT + planned social login (Google, Apple, Facebook) |
| Dev Tools | ESLint, Prettier, Nodemon              |

---
## 🧱 Project Structure 

## 🔧 Features in This Setup
### Backend
- User Registration & JWT Login
- Tour Management (Create, Join, Delete)
- Add, Split & Track Expenses
- Calculate Individual Balances
- Secure Routes with JWT Middleware
- RESTful API with Express.js

### Frontend
- Login/Register UI
- Tour dashboard
- Add expense
- Split & balance viewer
- QR invite route 
- Axios connection to backend
- Auth protected routes (JWT)

## ⚙️ What I’ll Do Next
1. Scaffold a working frontend (frontend/)
2. Connect Axios to backend http://localhost:5000/api
3. Add some sample pages & UI (login, dashboard, add expense)
4. Ensure full local development works via:

```bash
// For Backend
cd backend
npm install

// For Frontend
cd frontend
npm install

