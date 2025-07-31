"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await register(name, email, password)

    if (result.success) {
      navigate("/")
    } else {
      setError(result.message || "Registration failed. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <div style={{ padding: "40px 0" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Join TourPay</h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "40px" }}>
          Join TourPay to manage your travel expenses with friends and tour groups.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007AFF" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
