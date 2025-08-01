# 🧾 TourPay Backend

TourPay is a collaborative expense-sharing platform built for group trips and shared tours. This backend powers all the APIs, authentication, tour expense logic, and user management for the platform.

---

## ⚙️ Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | React 18, Vite, CSS                    |
| Backend   | Node.js, Express.js, JWT               |
| Database  | MySQL with Sequelize ORM               |
| Storage   | Cloudinary (optional media uploads)    |
| Auth      | JWT + login                            |
| Dev Tools | ESLint, Prettier, Nodemon              |

---

## ✨ Features

### Authentication
- User registration & login (JWT-based)
- Planned: logins

### Tours
- Create and manage group tours
- Invite members via QR code
- Join tour functionality

### Expenses
- Add expenses to tours
- Split between members (equal or custom amounts)
- Currency support
- Real-time balance calculation (like Tricount or Splitwise)

### 🌙 UX/UI
- Responsive design

### 🛠️ Under Development
- Messaging between members
- Payment integration 
- Export PDF summaries

---

## 🗂 Project Structure

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/tourpay.git
cd tourpay
```

### 2. Backend Setup
- Install dependencies
```bash
cd backend
npm install
```
- Create .env
- Start the backend
```bash
npm run dev
```

### 3. Frontend Setup
- Install dependencies
```bash
cd backend
npm install
```
- Start the frontend
```bash
npm run dev
```
The app should now be available at: http://localhost:5173

## 📖 API Overview
```bash
POST /api/auth/register – Register new user
POST /api/auth/login – Login & get JWT
GET /api/users/me – Get current user info
POST /api/tours – Create tour
GET /api/tours/:id – Get tour details
POST /api/expenses – Add expense to tour
GET /api/expenses/:tourId – List tour expenses
```
