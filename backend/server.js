require("dotenv").config();  
const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const tourRoutes = require("./routes/tourRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ---------------- Connect to database ----------------
connectDB();

// ---------------- Middleware ----------------
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]  
        : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Serve uploads folder (for uploaded images/photos)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

// ---------------- Serve frontend in production ----------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// ---------------- Fallback 404 handler ----------------
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ---------------- Error handling middleware ----------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ---------------- Start server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
});
