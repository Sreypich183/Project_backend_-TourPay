const FreeCard = () => {
  return (
    <div className="empty-state">
      <div
        style={{
          width: "200px",
          height: "120px",
          background: "linear-gradient(45deg, #00C851, #007E33, #0099CC, #33B5E5, #FF8800, #FF4444)",
          borderRadius: "15px",
          margin: "0 auto 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "15px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "30px",
            height: "20px",
            background: "white",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#333",
          }}
        >
          📶
        </div>

        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            width: "25px",
            height: "20px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: "4px",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "15px",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <br />
          <span style={{ fontSize: "12px", fontWeight: "normal" }}>credit</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
            display: "flex",
            gap: "5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#FF4444",
              borderRadius: "50%",
              opacity: 0.8,
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#FFD60A",
              borderRadius: "50%",
              opacity: 0.8,
              marginLeft: "-10px",
            }}
          ></div>
        </div>
      </div>

      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>A Free Credit Card isn't Available to You Yet</h1>

      <p style={{ fontSize: "16px", color: "#888", marginBottom: "40px" }}>
        We don't offer our Free Credit Card in Cambodia just yet. Once we do, you're among the first to hear!
      </p>

      <p style={{ fontSize: "16px", color: "#888" }}>
        Learn more on <span style={{ color: "#007AFF" }}>Together</span>.
      </p>
    </div>
  )
}

export default FreeCard
