"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import CreateTourModal from "../components/CreateTourModal"
import JoinTourModal from "../components/JoinTourModal"
import AddOptionsModal from "../components/AddOptionsModal"
import { Link } from "react-router-dom"

const Home = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddOptions, setShowAddOptions] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const response = await axios.get("/api/tours")
      setTours(response.data)
    } catch (error) {
      console.error("Error fetching tours:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTourCreated = () => {
    setShowCreateModal(false)
    fetchTours()
  }

  const handleTourJoined = () => {
    setShowJoinModal(false)
    fetchTours()
  }

  if (loading) {
    return <div className="loading">Loading tour groups...</div>
  }

  return (
    <div>
      {tours.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎒</div>
          <h2>No Tour Groups Yet</h2>
          <p>
            Tap on "+" to create a tour group
            <br />
            or{" "}
            <button
              onClick={() => setShowAddOptions(true)}
              style={{
                background: "none",
                border: "none",
                color: "#007AFF",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              sign in
            </button>{" "}
            to join existing ones
          </p>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: "24px", marginBottom: "20px", marginTop: "20px", textAlign: "center" }}>My Tour Groups</h1>
          {tours.map((tour) => (
            <Link key={tour._id} to={`/tour/${tour._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="tour-card"
                style={{
                  background: "#1a1a1a",
                  borderRadius: "15px",
                  padding: "20px",
                  margin: "15px 0",
                  border: "1px solid #333",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "24px", marginRight: "15px" }}>{tour.icon || "🎒"}</div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>{tour.title}</div>
                    <div style={{ color: "#888", fontSize: "14px" }}>
                      Total: {tour.totalAmount} {tour.currency}
                    </div>
                    <div style={{ color: "#888", fontSize: "12px" }}>{tour.participants?.length || 0} members</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <button className="floating-btn" onClick={() => setShowAddOptions(true)}>
        +
      </button>

      {showAddOptions && (
        <AddOptionsModal
          onClose={() => setShowAddOptions(false)}
          onCreateNew={() => {
            setShowAddOptions(false)
            setShowCreateModal(true)
          }}
          onJoinExisting={() => {
            setShowAddOptions(false)
            setShowJoinModal(true)
          }}
        />
      )}

      {showCreateModal && <CreateTourModal onClose={() => setShowCreateModal(false)} onSuccess={handleTourCreated} />}

      {showJoinModal && <JoinTourModal onClose={() => setShowJoinModal(false)} onSuccess={handleTourJoined} />}
    </div>
  )
}

export default Home
