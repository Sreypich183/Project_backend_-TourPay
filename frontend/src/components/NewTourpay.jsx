import { Link } from "react-router-dom";

export default function NewTourpay() {
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
    },
    cancelLink: {
      color: "#f66",
      textDecoration: "none",
      fontWeight: "bold",
      marginBottom: "20px",
      display: "inline-block",
    },
    label: {
      fontSize: "1rem",
      marginBottom: "10px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      background: "#2a2a2a",
      color: "#fff",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.cancelLink}>
        Cancel
      </Link>
      <label style={styles.label}>Title</label>
      <input type="text" name="title" id="title" placeholder="Enter tourpay title" style={styles.input} />

      <label style={styles.label}>Options</label>
      <select style={styles.input}>
        <option>US Dollar</option>
        <option>Euro</option>
        <option>Cambodian Riel</option>
        <option>British Pound</option>
      </select>

      <label style={styles.label}>Participants</label>
      <input type="text" name="title" id="title" placeholder="Participant Name" style={styles.input} />
      <button>Add Another Participant</button>
        
    </div>
  );
}
