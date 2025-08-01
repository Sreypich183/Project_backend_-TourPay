"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
  const { user, logout } = useAuth()
  const [showSignIn, setShowSignIn] = useState(false)

  if (!user) {
    return (
      <div className="empty-state">
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#333",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            👤
          </div>
        </div>

        <h2>Sign in</h2>
        <p style={{ marginBottom: "40px" }}>
          Save your tour groups to your profile, use TourPay on multiple devices and get notifications.
        </p>

        <div className="auth-options">
          <button className="auth-btn auth-btn-apple">
            <span className="auth-icon">🍎</span>
            Sign in with Apple
          </button>
          <button className="auth-btn auth-btn-google">
            <span className="auth-icon">G</span>
            Sign in with Google
          </button>
          <button className="auth-btn auth-btn-facebook">
            <span className="auth-icon">f</span>
            Sign in with Facebook
          </button>
          <button className="auth-btn auth-btn-email">
            <span className="auth-icon">✉️</span>
            Sign in with Email
          </button>
        </div>

        <div className="preferences-section">
          <h3>Preferences</h3>
          <div className="preference-item">
            <span className="preference-label">Language</span>
            <span className="preference-value">
              English <span className="arrow-right">›</span>
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#333",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
          }}
        >
          👤
        </div>
        <h2>{user.name}</h2>
        <p style={{ color: "#888" }}>{user.email}</p>
      </div>

      <div className="preferences-section">
        <h3>Preferences</h3>
        <div className="preference-item">
          <span className="preference-label">Language</span>
          <span className="preference-value">
            {user.preferences?.language || "English"} <span className="arrow-right">›</span>
          </span>
        </div>
        <div className="preference-item">
          <span className="preference-label">Currency</span>
          <span className="preference-value">
            {user.preferences?.currency || "USD"} <span className="arrow-right">›</span>
          </span>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={logout} style={{ marginTop: "40px" }}>
        Sign Out
      </button>
    </div>
  )
}

export default Profile
