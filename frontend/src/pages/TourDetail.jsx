"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import AddExpenseModal from "../components/AddExpenseModal"
import TourOptionsMenu from "../components/TourOptionsMenu"

// Currency symbol mapping
const CURRENCY_SYMBOLS = {
  USD: '$',
  KHR: "៛",
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$'
}

const formatAmount = (amount, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$'
  return `${symbol}${amount.toFixed(2)}`
}

// Helper to extract consistent user ID from different possible user objects or strings
const getUserId = (user) => {
  if (!user) return null
  if (typeof user === 'string') return user
  if (user._id) return user._id
  if (user.name) return user.name
  return null
}

const TourDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Expenses")
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [balances, setBalances] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchTourDetails()
    fetchExpenses()
  }, [id])

  useEffect(() => {
    if (tour && expenses.length > 0) {
      calculateBalances()
    }
  }, [tour, expenses])

  const fetchTourDetails = async () => {
    try {
      const response = await axios.get(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTour(response.data)
    } catch (error) {
      console.error("Error fetching tour:", error)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/expenses/tour/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setExpenses(response.data)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  const calculateBalances = () => {
    if (!tour) return

    // Initialize balances map keyed by consistent user IDs
    const balanceMap = new Map()
    tour.participants.forEach(p => {
      const id = getUserId(p.user) || p.name
      balanceMap.set(id, {
        id,
        name: p.name,
        balance: 0,
        originalBalance: 0
      })
    })

    // Calculate balances from expenses
    expenses.forEach(expense => {
      const payerKey = getUserId(expense.paidBy)
      if (balanceMap.has(payerKey)) {
        const payer = balanceMap.get(payerKey)
        balanceMap.set(payerKey, {
          ...payer,
          balance: payer.balance + expense.amount,
          originalBalance: payer.originalBalance + expense.amount
        })
      }

      expense.splitBetween?.forEach(split => {
        const participantKey = getUserId(split.user)
        if (balanceMap.has(participantKey)) {
          const participant = balanceMap.get(participantKey)
          balanceMap.set(participantKey, {
            ...participant,
            balance: participant.balance - split.amount,
            originalBalance: participant.originalBalance - split.amount
          })
        }
      })
    })

    setBalances(Array.from(balanceMap.values()))
  }

  const handleExpenseAdded = () => {
    setShowAddExpense(false)
    fetchExpenses()
    fetchTourDetails()
  }

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const getMyExpenses = () => {
    return expenses
      .filter((expense) =>
        expense.paidBy._id === tour?.participants.find((p) => p.name.includes("Me"))?.user?._id
      )
      .reduce((total, expense) => total + expense.amount, 0)
  }

  const handleEdit = async () => {
    const newTitle = prompt("Enter new tour title", tour.title)
    if (!newTitle || newTitle.trim() === "") {
      alert("Tour title cannot be empty")
      return
    }

    try {
      const response = await axios.put(
        `/api/tours/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const updatedTour = response.data.tour || response.data
      if (!updatedTour) throw new Error("Invalid response from server")
      setTour(updatedTour)
      alert("Tour updated successfully")
      setShowOptions(false)
    } catch (error) {
      console.error("Update error:", error)
      const errorMessage = error.response?.data?.message ||
        error.message || "Failed to update tour"
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return

    try {
      await axios.delete(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Tour deleted successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Failed to delete tour")
    }
  }

  const handleArchive = async () => {
    if (!window.confirm("Archive this tour?")) return

    try {
      await axios.post(
        `/api/tours/${id}/archive`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert("Tour archived")
      fetchTourDetails()
      setShowOptions(false)
    } catch (error) {
      console.error(error)
      alert("Failed to archive tour")
    }
  }

  const handleInsights = async () => {
    try {
      const response = await axios.get(`/api/tours/${id}/insights`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert(JSON.stringify(response.data, null, 2))
      setShowOptions(false)
    } catch (error) {
      console.error(error)
      alert("Failed to fetch insights")
    }
  }

  const handleShare = () => {
    alert(`Invite Code: ${tour.invite_code}`)
    setShowOptions(false)
  }

  const getExpenseIcon = (title) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("drink") || lowerTitle.includes("bar")) return "🥂"
    if (lowerTitle.includes("food") || lowerTitle.includes("restaurant")) return "🍽"
    if (lowerTitle.includes("transport") || lowerTitle.includes("taxi") || lowerTitle.includes("flight")) return "✈️"
    if (lowerTitle.includes("hotel") || lowerTitle.includes("accommodation")) return "🏨"
    if (lowerTitle.includes("activity") || lowerTitle.includes("tour") || lowerTitle.includes("ticket")) return "🎫"
    return "💰"
  }

  const groupExpensesByDate = () => {
    const grouped = {}
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toDateString()
      const isToday = date === new Date().toDateString()
      const key = isToday ? "Today" : date
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(expense)
    })
    return grouped
  }

  const renderExpensesTab = () => {
    const groupedExpenses = groupExpensesByDate()
    const totalExpenses = getTotalExpenses()
    const myExpenses = getMyExpenses()

    if (expenses.length === 0) {
      return (
        <div className="empty-state">
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>💸</div>
          <h2>No Expenses Yet</h2>
          <p>Add an expense by tapping on the "+" to start tracking and splitting your tour expenses</p>
        </div>
      )
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#888", fontSize: "14px" }}>Total Expenses</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {formatAmount(totalExpenses, tour?.currency)}
            </div>
          </div>
        </div>

        {Object.entries(groupedExpenses).map(([dateGroup, expenseList]) => (
          <div key={dateGroup}>
            <h3 style={{ margin: "20px 0 15px 0", fontSize: "18px" }}>{dateGroup}</h3>
            {expenseList.map((expense) => (
              <div
                key={expense._id}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "15px",
                  padding: "15px",
                  margin: "10px 0",
                  border: "1px solid #333",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "24px", marginRight: "15px" }}>{getExpenseIcon(expense.title)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>{expense.title}</div>
                  <div style={{ fontSize: "14px", color: "#888" }}>
                    <div>
                      Paid by{" "}
                      {[expense.paidBy.name, ...(expense.splitBetween?.map(split => split.user?.name || split.user) || [])]
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .join(", ")}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {formatAmount(expense.amount, tour?.currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const renderBalancesTab = () => {
    return (
      <div>
        <h3 style={{ margin: "30px 0 15px 0", fontSize: "18px" }}>Member Balances</h3>
        {balances.map((balance, index) => (
          <div
            key={index}
            style={{
              background: "#1a1a1a",
              borderRadius: "15px",
              padding: "15px",
              margin: "10px 0",
              border: "1px solid #333",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "18px",
              }}
            >
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{balance.name}</div>
              {balance.name.includes("Me") && <div style={{ fontSize: "12px", color: "#888" }}>Me</div>}
            </div>
            <div style={{ 
              fontWeight: "bold", 
              fontSize: "16px",
              color: balance.balance > 0 ? "#4CAF50" : balance.balance < 0 ? "#F44336" : "#FFFFFF"
            }}>
              {formatAmount(balance.balance, tour?.currency)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return <div className="loading">Loading tour details...</div>
  }

  if (!tour) {
    return <div className="error-message">Tour group not found</div>
  }

  return (
    <div className="container">
      <header className="header">
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "white", fontSize: "30px", cursor: "pointer" }}
        >
          ← Tours
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            style={{
              position: "absolute",
              top: "5px",
              right: "20px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            ⋯
          </button>
        </div>
      </header>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(45deg, #1e3a8a, #3b82f6)",
            borderRadius: "15px",
            margin: "0 auto 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            position: "relative",
          }}
        >
          {tour.icon || "🎒"}
          <div style={{ position: "absolute", bottom: "5px", right: "5px", fontSize: "12px" }}>✨</div>
        </div>
        <h1 style={{ fontSize: "28px", marginBottom: "5px" }}>{tour.title}</h1>
        <p style={{ color: "#888", fontSize: "14px" }}>{tour.participants?.length || 0} members</p>
      </div>

      <div
        style={{
          display: "flex",
          background: "#333",
          borderRadius: "15px",
          padding: "5px",
          margin: "20px 0",
        }}
      >
        {["Expenses", "Balances"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: activeTab === tab ? "#555" : "transparent",
              color: "white",
              fontWeight: activeTab === tab ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ paddingBottom: "100px" }}>
        {activeTab === "Expenses" && renderExpensesTab()}
        {activeTab === "Balances" && renderBalancesTab()}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setShowAddExpense(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "30px",
            border: "none",
            fontSize: "32px",
            color: "white",
            cursor: "pointer",
            background: "linear-gradient(135deg, #007aff, #5856d6)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          +
        </button>
        <div
          style={{
            marginTop: "8px",
            background: "#1e3a8a",
            color: "white",
            fontSize: "12px",
            padding: "2px 8px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Add Expense
        </div>
      </div>

      {showAddExpense && (
        <AddExpenseModal
          tour={tour}
          currency={tour?.currency || 'USD'}
          onClose={() => setShowAddExpense(false)}
          onSuccess={handleExpenseAdded}
        />
      )}

      {showOptions && (
        <TourOptionsMenu
          tour={tour}
          onClose={() => setShowOptions(false)}
          onEdit={handleEdit}
          onShare={handleShare}
          onInsights={handleInsights}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default TourDetail