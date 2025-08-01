# 🧾 TourPay Backend

TourPay is a collaborative expense-sharing platform built for group trips and shared tours. This backend powers all the APIs, authentication, tour expense logic, and user management for the platform.

---

## 🚀 Features

- 👥 User Registration & JWT Login
- ✈️ Create & Join Tours
- 💸 Add, Split & Track Expenses
- 📊 Real-Time TourPay Balancing
- ✅ Validation & Auth Middleware
- 🔐 Secure JWT Token Authentication
- 🌐 RESTful API architecture

---

## 📁 Project Structure
backend/
├── config/ # Database and JWT configs
├── controllers/ # API logic for auth, tours, expenses
├── middleware/ # Auth and validation middleware
├── models/ # Sequelize models: User, Tour, Expense
├── routes/ # Express routes for APIs
├── server.js # Express server entry point
