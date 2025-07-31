"use client"

const AddOptionsModal = ({ onClose, onCreateNew, onJoinExisting }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
      <div className="modal-header">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal-title" style={{ textAlign: 'center', flex: 1 }}>
          Add Tour Group
        </h2>
        {/* Add empty div to balance the close button */}
        <div style={{ width: '24px' }}></div> 
      </div>

        <div style={{ margin: "20px 0" }}>
          <button
            onClick={onCreateNew}
            style={{
              width: "100%",
              background: "#333",
              border: "1px solid #555",
              borderRadius: "15px",
              padding: "20px",
              color: "white",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#007AFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "24px",
              }}
            >
              +
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Start a new tour group</div>
              <div style={{ color: "#888", fontSize: "14px" }}>Start a new tour group from scratch.</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#666" }}>›</div>
          </button>

          <button
            onClick={onJoinExisting}
            style={{
              width: "100%",
              background: "#333",
              border: "1px solid #555",
              borderRadius: "15px",
              padding: "20px",
              color: "white",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#34C759",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "24px",
              }}
            >
              🔗
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Join an existing tour group</div>
              <div style={{ color: "#888", fontSize: "14px" }}>Use an invite link to join an existing tour group.</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#666" }}>›</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddOptionsModal
