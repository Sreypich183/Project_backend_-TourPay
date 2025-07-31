"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

const AddExpenseModal = ({ tour, onClose, onSuccess }) => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("Expense")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("100") // Default to 100 for testing
  const [paidBy, setPaidBy] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [splitType, setSplitType] = useState("Equally")
  const [splits, setSplits] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("Food")

  // Initialize splits with current user selected by default
  useEffect(() => {
    if (tour && user) {
      setPaidBy(user.id)
      const initialSplits = tour.participants.map((p) => ({
        userId: p.user?._id || null,
        name: p.name,
        amount: 0,
        selected: p.user?._id === user.id || p.name.includes("Me"),
      }))
      setSplits(initialSplits)
    }
  }, [tour, user])

  // Calculate splits whenever relevant values change
  useEffect(() => {
    if (splitType === "Equally" && amount) {
      calculateEqualSplit()
    }
  }, [amount, splits, splitType])

  const calculateEqualSplit = () => {
    const selectedParticipants = splits.filter((s) => s.selected)
    if (selectedParticipants.length === 0 || !amount) return

    const perPerson = Number.parseFloat(amount) / selectedParticipants.length
    setSplits(
      splits.map((s) => ({
        ...s,
        amount: s.selected ? perPerson : 0,
      }))
    )
  }

  const handleAmountChange = (val) => {
    setAmount(val)
    // Calculation will be handled by the useEffect
  }

  const toggleParticipant = (index) => {
    const updated = [...splits]
    updated[index].selected = !updated[index].selected
    setSplits(updated)
    // Calculation will be handled by the useEffect
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const splitBetween = splits
        .filter((s) => s.selected && s.amount > 0)
        .map((s) => ({
          user: s.userId,
          amount: s.amount,
        }))
      await axios.post("/api/expenses", {
        title,
        amount: Number.parseFloat(amount),
        tourId: tour._id,
        splitBetween,
        date,
        category,
      })
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  // Dark input/select style
  const inputDarkStyle = {
    background: "#222",
    color: "#ccc",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "10px",
    width: "100%"
  }

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(52, 52, 52, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div className="modal" style={{
        background: "#000",
        borderRadius: "15px",
        width: "100%",
        maxWidth: "500px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "15px",
          borderBottom: "1px solid #333",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}>
          <button onClick={onClose} style={{
            position: "absolute", left: "15px",
            color: "#999", background: "none", border: "none", cursor: "pointer", fontSize: "20px"
          }}>Cancel</button>
          <h2 style={{ color: "white", margin: 0 }}>Add Expense</h2>
        </div>

        {/* Scrollable content */}
        <div className="scroll-hidden" style={{
          flex: 1,
          overflowY: "scroll",
          padding: "20px"
        }}>

          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            {/* Title */}
            <div>
              <label style={{ color: "#ccc",}}>Title</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="E.g. Hotel Booking"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ flex: 1, ...inputDarkStyle }}
                />
                <button type="button" style={iconBtn}>😊</button>
                <button type="button" style={iconBtn}>📷</button>
              </div>
            </div>

            {/* Amount */}
            <div style={{ marginTop: "15px" }}>
              <label style={{ color: "#ccc" }}>Amount</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                
                <input
                  type="number" step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  required
                  style={{ flex: 1, fontSize: "18px", ...inputDarkStyle }}
                />
              </div>
            </div>

            {/* Paid By & When */}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#ccc" }}>Paid By</label>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}></div>
                <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required style={inputDarkStyle}>
                  {tour.participants.map((p, idx) => (
                    <option key={idx} value={p.user?._id || ""}>
                      {p.name} {p.name.includes("Me") ? "(Me)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#ccc" }}>When</label>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}></div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputDarkStyle} />
              </div>
            </div>

            {/* Category */}
            <div style={{ marginTop: "15px" }}>
              <label style={{ color: "#ccc" }}>Category</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}></div>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required style={inputDarkStyle}>
                <option value="Food">🍽️ Food & Dining</option>
                <option value="Accommodation">🏨 Accommodation</option>
                <option value="Transport">✈️ Transport</option>
                <option value="Entertainment">🎫 Activities & Tours</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Other">💰 Other</option>
              </select>
            </div>

            {/* Split */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginBottom: "10px" 
              }}>
                <label style={{ color: "#ccc" }}>Split Between</label>
              </div>

              {splits.map((s, i) => (
                <div key={i} style={{
                  display: "flex", 
                  alignItems: "center",
                  background: "#1a1a1a", 
                  borderRadius: "10px", 
                  margin: "8px 0",
                  border: s.selected ? "2px solid #007AFF" : "1px solid #444", 
                  padding: "12px",
                  transition: "all 0.2s ease"
                }}>
                  <button 
                    type="button" 
                    onClick={() => toggleParticipant(i)} 
                    style={checkBtn(s.selected)}
                    aria-label={s.selected ? "Deselect participant" : "Select participant"}
                  >
                    {s.selected ? "✓" : ""}
                  </button>
                  <div style={{ 
                    flex: 1, 
                    color: "#fff", 
                    fontWeight: "500",
                    marginLeft: "8px"
                  }}>
                    {s.name}
                  </div>
                  <div style={{ 
                    color: "#fff", 
                    fontSize: "16px",
                    fontWeight: "bold",
                    minWidth: "80px",
                    textAlign: "right"
                  }}>
                    {s.amount.toFixed(2)} {/* Changed from formatAmount to just show the number */}
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="submit" 
              disabled={loading || !amount || !title}
              style={{
                width: "100%", 
                padding: "15px", 
                marginTop: "10px",
                borderRadius: "10px", 
                border: "none", 
                background: loading ? "#555" : "#007AFF",
                color: "white", 
                fontSize: "16px", 
                fontWeight: "bold", 
                cursor: "pointer",
                transition: "all 0.2s ease",
                opacity: loading || !amount || !title ? 0.7 : 1
              }}
            >
              {loading ? (
                <>
                  <span style={{ verticalAlign: "middle" }}>Adding...</span>
                </>
              ) : (
                "Add Expense"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
// Styles
const iconBtn = {
  width: "50px", height: "50px", background: "#333", border: "1px solid #555",
  borderRadius: "10px", color: "#888", fontSize: "18px", cursor: "pointer"
}

const currencyBox = {
  width: "80px", height: "50px", background: "#333", border: "1px solid #555",
  borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888"
}

const checkBtn = (selected) => ({
  width: "24px", height: "24px", borderRadius: "50%",
  background: selected ? "#007AFF" : "transparent",
  border: "2px solid #007AFF", color: "white", marginRight: "10px",
  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", cursor: "pointer"
})

export default AddExpenseModal