"use client"

import { useState } from "react"
import axios from "axios"

const CreateTourModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [participants, setParticipants] = useState([{ name: "" }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "" }])
  }

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...participants]
    newParticipants[index].name = value
    setParticipants(newParticipants)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const validParticipants = participants.filter((p) => p.name.trim())
      await axios.post("/api/tours", {
        title,
        currency,
        participants: validParticipants,
      })
      onSuccess()
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create tour group")
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
            Create Tour Group
          </h2>
          {/* Add empty div to balance the close button */}
          <div style={{ width: '24px' }}></div> 
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">Tour Name</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#333",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  fontSize: "24px",
                }}
              >
                🎒
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="E.g. Europe Trip 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Options</label>
            <div style={{ background: "#333", borderRadius: "10px", padding: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Currency</span>
                <select
                  className="form-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ background: "transparent", border: "none", color: "#888" }}
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="KHR">Cambodian Riel (៛)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="JPY">Japanese Yen (¥)</option>
                  <option value="CAD">Canadian Dollar (CA$)</option>
                  <option value="AUD">Australian Dollar (A$)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tour Members</label>
            {participants.map((participant, index) => (
              <div key={index} style={{ display: "grid", alignItems: "center", marginBottom: "10px" }}>
                {index === 0 && (
                  <span
                    style={{
                      background: "#007AFF",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "15px",
                      fontSize: "16px",
                      marginBottom: "10px",
                      textAlign: "center",
                      padding: "10px 0"
                    }}
                  >
                    Me
                  </span>
                )}
                <input
                  type="text"
                  className="form-input"
                  placeholder="Member Name"
                  value={participant.name}
                  onChange={(e) => handleParticipantChange(index, e.target.value)}
                  style={{ flex: 1, marginRight: "10px" }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddParticipant}
              style={{
                background: "none",
                border: "none",
                color: "#007AFF",
                fontSize: "16px",
                cursor: "pointer",
                padding: "10px 0",
              }}
            >
              Add Another Member
            </button>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Tour Group"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTourModal
