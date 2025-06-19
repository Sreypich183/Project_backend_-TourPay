import { Link } from "react-router-dom";
import { FaPlusCircle, FaLink, FaCloudUploadAlt } from "react-icons/fa";

export default function Tourpay() {
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    card: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      backgroundColor: "#1a1a1a",
      borderRadius: "12px",
      padding: "15px 20px",
      marginBottom: "15px",
      color: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      textDecoration: "none",
      transition: "background 0.3s",
    },
    cardHover: {
      backgroundColor: "#2c2c2c",
    },
    icon: {
      fontSize: "1.8rem",
    },
    textGroup: {
      flexGrow: 1,
    },
    heading: {
      fontSize: "1rem",
      fontWeight: "bold",
      margin: 0,
    },
    subtext: {
      fontSize: "0.85rem",
      color: "#ccc",
      marginTop: "4px",
    },
    arrow: {
      fontSize: "1.2rem",
      color: "#888",
    },
  };

  

  return (
    <div style={styles.container}>
      <div style={styles.title}>Add</div>

      <Link to="/NewTourpay" style={styles.card}>
        <FaPlusCircle style={{ ...styles.icon, color: "#3b82f6" }} />
        <div style={styles.textGroup}>
          <p style={styles.heading}>Start a new tourpay</p>
          <p style={styles.subtext}>Start a new tourpay from scratch.</p>
        </div>
        <span style={styles.arrow}>›</span>
      </Link>

      <Link to="/JoinTourpay" style={styles.card}>
        <FaLink style={{ ...styles.icon, color: "#10b981" }} />
        <div style={styles.textGroup}>
          <p style={styles.heading}>Join an existing tourpay</p>
          <p style={styles.subtext}>Use an invite link to join an existing tourpay.</p>
        </div>
        <span style={styles.arrow}>›</span>
      </Link>

      <Link to="/ImportSplitwise" style={styles.card}>
        <FaCloudUploadAlt style={{ ...styles.icon, color: "#a855f7" }} />
        <div style={styles.textGroup}>
          <p style={styles.heading}>Import from Splitwise</p>
          <p style={styles.subtext}>Move your Splitwise group to tourpay.</p>
        </div>
        <span style={styles.arrow}>›</span>
      </Link>
    </div>
  );
}
