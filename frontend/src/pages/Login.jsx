"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      navigate("/")
    } else {
      setError(result.message || "Login failed. Please check your credentials.")
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <div style={{ padding: "40px 0" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Sign in to TourPay</h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "40px" }}>
          Save your tour groups to your profile, use TourPay on multiple devices and get notifications.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#007AFF" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
