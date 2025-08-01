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
  
