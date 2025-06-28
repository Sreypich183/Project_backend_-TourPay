import { Link } from "react-router-dom";

export default function ImportSplitwise() {
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "30px 20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#1a1a1a",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      color: "#fff",
      borderRadius: "12px",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    cancelLink: {
      textDecoration: "none",
      fontWeight: "bold",
    },
    heading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    spacer: {
      width: "50px",
    },
    text: {
      fontSize: "0.95rem",
      color: "#ccc",
      padding: "0 10px",
      textAlign: "center",
      marginBottom: "10px",
    },
    highlight: {
      color: "#3b82f6",
      fontWeight: "500",
      textDecoration: "none",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      borderRadius: "12px",
      marginTop: "24px",
      marginBottom: "30px",
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
      marginBottom: "16px",
    },
    linkText: {
      color: "#3b82f6",
      fontWeight: "500",
      fontSize: "1rem",
      textDecoration: "none",
      cursor: "pointer",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <Link to="/" style={styles.cancelLink}>Cancel</Link>
        <div style={styles.heading}>Import from Splitwise</div>
        <div style={styles.spacer}></div>
      </div>

      <div style={styles.text}>
        <span style={styles.highlight}>Open Splitwise</span>, go to your group,
        tap “Export” and save the CSV file on your phone
      </div>

      <img
        src="/images/splitwise-example.png"
        alt="Splitwise Screenshot"
        style={styles.image}
      />

      <button style={styles.button}>Continue to Upload</button>

      <div style={styles.linkText}>Learn More</div>
    </div>
  );
}
