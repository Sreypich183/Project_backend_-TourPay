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
```bash
Project/
├── backend/
│ ├── server.js # Express app entry point
│ ├── config/ # DB & JWT config
│ ├── controllers/ # API logic
│ ├── middleware/ # Auth, validation
│ ├── models/ # Sequelize models
│ └── routes/ # API route definitions
├── frontend/
│ ├── src/
│ │ ├── app/ # Redux store & providers
│ │ ├── components/ # UI components
│ │ ├── features/ # Slices, services
│ │ ├── pages/ # Page views
│ │ ├── i18n/ # Translations
│ │ └── main.jsx # Entry point
│ └── vite.config.js
└── README.md
```

---

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
```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=tourpay_db
```
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
The app should now be available at: http://localhost:3000

---

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

---

## 🔧 Technical Implementation Details

### 📊 Database Architecture
- **MySQL**: Chosen for ACID compliance, complex relationships, and performance
- **Sequelize ORM**: Type-safe database operations with automatic validation
- **Migration System**: Version-controlled schema changes for reliable deployments
- **Seeding**: Automated test data generation for development and testing

### 🔐 Authentication & Security
- **JWT Tokens**: Stateless authentication with automatic refresh
- **Password Hashing**: `bcrypt` for secure password storage
- **API Security**: Rate limiting, CORS configuration, and input validation

### 🎨 Frontend Architecture
- **React 18**: Latest React with concurrent features and improved performance
- **Vite**: Fast build tool with HMR and optimized bundling
- **Redux Toolkit**: Simplified state management with DevTools integration
- **CSS**: Utility-first CSS framework for rapid UI development
- **Component Library**: Reusable, accessible components with consistent styling

---
