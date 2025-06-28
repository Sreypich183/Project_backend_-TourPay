import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignInWithApple() {
  const navigate = useNavigate();

  const handleAppleLogin = () => {
    // Placeholder logic. You would integrate Apple JS SDK or redirect to server-side endpoint.
    console.log("Redirecting to Apple login...");
    navigate("/profile"); // simulate successful login
  };

  return (
    <div style={styles.container}>
      <h2>Sign in with Apple</h2>
      <p>Use your Apple ID to securely log in.</p>
      <div style={styles.form}>
        <button style={styles.button} onClick={handleAppleLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            viewBox="0 0 24 24"
            style={{ marginRight: 10 }}
          >
            <path d="M16.365 1.43c0 1.14-.455 2.195-1.185 3.005-.81.945-2.1 1.665-3.24 1.56-.15-1.17.48-2.355 1.23-3.09.825-.84 2.19-1.485 3.195-1.475zm3.99 17.1c-.54 1.245-1.17 2.46-2.055 3.45-.885.975-2.07 2.01-3.42 1.98-1.32-.03-1.83-.87-3.435-.87-1.59 0-2.16.84-3.465.9-1.365.06-2.475-.99-3.36-1.965C2.805 20.73.9 16.29 2.88 12.54c.945-1.86 2.625-3 4.5-3.015 1.38-.015 2.685.945 3.45.945.75 0 2.325-1.17 3.945-1 .67.03 2.55.27 3.765 2.04-.1.06-2.25 1.305-2.22 3.885.03 3.075 2.73 4.095 2.79 4.11z" />
          </svg>
          Sign in with Apple
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>
        <a href="/profile" style={{ color: "#007BFF" }}>
          Back to Profile
        </a>
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
    textAlign: "center",
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#000", // Apple black
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
