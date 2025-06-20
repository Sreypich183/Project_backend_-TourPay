import { Link } from "react-router-dom";
import { useState } from "react";

export default function NewTourpay() {
  const [participants, setParticipants] = useState(["Me"]);

  const addParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#000", 
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
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    label: {
      fontSize: "1rem",
      marginTop: "20px",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      width: "95%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#2a2a2a",
      color: "#fff",
      fontSize: "1rem",
    },
    inputcurrency: {
      width: "99.5%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#2a2a2a",
      color: "#fff",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      marginTop: "30px",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#3182f6",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
    addButton: {
      marginTop: "10px",
      background: "none",
      color: "#3182f6",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <Link to="/" style={styles.cancelLink}>
          Cancel
        </Link>
        <span style={styles.heading}>Add tourpay</span>
        <span></span>
      </div>

      <label style={styles.label}>Title</label>
      <input
        type="text"
        name="title"
        placeholder="E.g. City Trip"
        style={styles.input}
      />

      <label style={styles.label}>Options</label>
      <select style={styles.inputcurrency}>
        <option>US Dollar</option>
        <option>Euro</option>
        <option>Cambodian Riel</option>
        <option>British Pound</option>
      </select>

      <label style={styles.label}>Participants</label>
      {participants.map((p, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={p ? p : "Participant Name"}
          style={styles.input}
        />
      ))}
      <button style={styles.addButton} onClick={addParticipant}>
        Add Another Participant
      </button>

      <button style={styles.button}>Create tourpay</button>
    </div>
  );
}
