// const express = require("express")
// const cors = require("cors")
// const path = require("path")
// const { connectDB } = require("./config/database")
// require("dotenv").config()

// const authRoutes = require("./routes/authRoutes")
// const tourRoutes = require("./routes/tourRoutes")
// const expenseRoutes = require("./routes/expenseRoutes")
// const userRoutes = require("./routes/userRoutes")

// const app = express()

// // Middleware
// app.use(
//   cors({
//     origin: process.env.NODE_ENV === "production" ? ["https://your-frontend-domain.com"] : ["http://localhost:3000"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// )
// app.use(express.json())

// // Add request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`, req.body)
//   next()
// })

// // Routes
// app.use("/api/auth", authRoutes)
// app.use("/api/tours", tourRoutes)
// app.use("/api/expenses", expenseRoutes)
// app.use("/api/users", userRoutes)

// // Serve static files from React build in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")))

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
//   })
// }

// // Database connection
// connectDB()

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({ message: "Something went wrong!" })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
