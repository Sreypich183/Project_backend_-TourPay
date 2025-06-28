import { Link } from "react-router-dom";
import React, { useState } from "react";

function SignInWithEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send name and email to backend (e.g., POST /api/send-link)
    console.log("Signing in with", { name, email });
    // You can show a message like "Check your email for the magic link!"
  };

  return (
    <div style={styles.container}>
      <h2>Sign in with Email</h2>
      <p>
        Provide us with your email address and we'll send you a link to confirm
        it. Please open it on this phone.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign in with Email
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/profile" style={{ color: "#007BFF" }}>
            Back to Profile
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1a1a1a",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    color: "#fff",
    padding: "2rem",
    maxWidth: "400px",
    margin: "auto",
    borderRadius: "10px",
    textAlign: "center",  // center text & inline elements
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center", // center children horizontally
  },
  input: {
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #222222",
    background: "#222222",
    fontSize: "1rem",
    width: "100%",         // fixed width
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",        // same width as input
    boxSizing: "border-box",
  },
};

export default SignInWithEmail;
