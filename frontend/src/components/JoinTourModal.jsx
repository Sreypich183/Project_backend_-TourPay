"use client"

import { useState } from "react"
import axios from "axios"

const JoinTourModal = ({ onClose, onSuccess }) => {
  const [inviteCode, setInviteCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("/api/tours/join", { inviteCode })
      onSuccess()
    } catch (error) {
      setError(error.response?.data?.message || "Failed to join tour group")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
          <h2 className="modal-title" style={{ textAlign: 'center', flex: 1 }}>
            Join a Tour Group
          </h2>
          {/* Add empty div to balance the close button */}
          <div style={{ width: '24px' }}></div> 
        </div>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#007AFF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
            }}
          >
            🔗
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#888", marginBottom: "20px" }}>
          Ask the tour organizer for the invite link to the tour group you want to join. Then,{" "}
          <strong>just click on that link</strong>.
        </p>

        <p style={{ textAlign: "center", color: "#888", marginBottom: "30px" }}>
          If you prefer, you can copy-paste the invite code in this box too.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Paste Invite Code Here"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Joining..." : "Join Tour Group"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default JoinTourModal
