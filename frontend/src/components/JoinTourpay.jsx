import { Link } from "react-router-dom";

export default function JoinTourpay() {
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "30px 20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: "12px",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    cancelLink: {
      textDecoration: "none",
      fontWeight: "bold",
    },
    heading: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textAlign: "center",
      flex: 1,
    },
    spacer: {
      width: "50px", // spacer to balance Cancel
    },
    icon: {
      fontSize: "3rem",
      color: "#3182f6",
      textAlign: "center",
      marginBottom: "20px",
    },
    subtext: {
      fontSize: "0.95rem",
      color: "#ccc",
      textAlign: "center",
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #444",
      background: "#1a1a1a",
      color: "#fff",
      fontSize: "1rem",
      marginBottom: "25px",
    },
    button: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#3182f6",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <Link to="/" style={styles.cancelLink}>Cancel</Link>
        <div style={styles.heading}>Join tourpay</div>
        <div style={styles.spacer}></div>
      </div>

      <div style={styles.icon}>🔗</div>

      <div style={styles.subtext}>
        Ask the other participants for the link of the tourpay you want to join.
        Then, <strong>just click on that link</strong>.
      </div>
      <div style={styles.subtext}>
        If you prefer, you can copy-paste it in this box too.
      </div>

      <input type="text" placeholder="Paste Link Here" style={styles.input} />
      <button style={styles.button}>Join</button>
    </div>
  );
}
