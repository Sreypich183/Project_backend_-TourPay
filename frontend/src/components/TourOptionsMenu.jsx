"use client"
import { useState } from "react"
import { QRCodeSVG } from 'qrcode.react'

const TourOptionsMenu = ({ tour, onClose, onEdit, onInsights, onArchive, onDelete }) => {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const handleOptionClick = (action) => {
    onClose()
    action()
  }

  const getInviteUrl = () => {
    // Use this for development (replace with your actual local IP)
    const devUrl = `http://192.168.1.100:3000` // 👈 Change this!
    
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 
                  (process.env.NODE_ENV === 'development' ? devUrl : window.location.origin)
    
    return `${baseUrl}/join?code=${tour.invite_code}`
  }

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(getInviteUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareNative = async () => {
    try {
      await navigator.share({
        title: `Join my tour: ${tour.title}`,
        text: `Use this code to join my tour: ${tour.invite_code}`,
        url: getInviteUrl()
      })
    } catch (err) {
      // Fallback to copy if sharing fails
      handleCopyInvite()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {showQR ? (
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "20px",
            background: "#1a1a1a",
            borderRadius: "15px",
            padding: "20px",
            minWidth: "280px",
            border: "1px solid #333",
            textAlign: "center",
            zIndex: 1000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Join {tour.title}</h3>
          
          <div style={{ 
            background: "white", 
            padding: "12px", 
            display: "inline-block",
            marginBottom: "15px",
            borderRadius: "8px"
          }}>
            <QRCodeSVG
              value={getInviteUrl()}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div style={{ 
            marginBottom: "15px",
            background: "#222",
            padding: "10px",
            borderRadius: "8px"
          }}>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Invite Code:</p>
            <p style={{ 
              fontWeight: "bold", 
              fontSize: "18px",
              wordBreak: "break-all"
            }}>
              {tour.invite_code}
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={handleCopyInvite}
              style={{
                padding: "10px 15px",
                background: "#007aff",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              {copied ? "✓ Copied!" : "Copy Link"}
            </button>
            
            <button
              onClick={handleShareNative}
              style={{
                padding: "10px 15px",
                background: "#34C759",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              Share
            </button>
          </div>

          <button
            onClick={() => setShowQR(false)}
            style={{
              padding: "8px 15px",
              background: "transparent",
              border: "1px solid #444",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              marginTop: "15px",
              width: "100%",
              fontSize: "14px"
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "20px",
            background: "#1a1a1a",
            borderRadius: "15px",
            padding: "10px",
            minWidth: "220px",
            border: "1px solid #333",
            zIndex: 1000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleOptionClick(onEdit)}
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px"
            }}
          >
            <span>Edit Tour</span>
            <span>⚙️</span>
          </button>

          <button
            onClick={() => setShowQR(true)}
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px"
            }}
          >
            <span>Share Invite</span>
            <span>📤</span>
          </button>

          <button
            onClick={() => handleOptionClick(onInsights)}
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px"
            }}
          >
            <span>Tour Insights</span>
            <span>📊</span>
          </button>

          <button
            onClick={() => handleOptionClick(onArchive)}
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px"
            }}
          >
            <span>Archive Tour</span>
            <span>🗃️</span>
          </button>

          <button
            onClick={() => handleOptionClick(onDelete)}
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "transparent",
              border: "none",
              color: "#ff3b30",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px"
            }}
          >
            <span>Delete Tour</span>
            <span>🗑️</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default TourOptionsMenu