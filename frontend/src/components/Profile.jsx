import { useState } from "react";
import { FaApple, FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
    },
    title: {
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    profileIcon: {
      fontSize: "60px",
      margin: "0 auto",
      display: "block",
      marginBottom: "10px",
    },
    subText: {
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#aaa",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "10px",
      borderRadius: "10px",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center",
    },
    apple: {
      background: "#fff",
      color: "#000",
    },
    google: {
      background: "#333",
      color: "#fff",
    },
    facebook: {
      background: "#333",
      color: "#fff",
    },
    email: {
      background: "#333",
      color: "#fff",
    },
    section: {
      marginTop: "30px",
    },
    label: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      background: "#2c2c2c",
      padding: "10px 15px",
      borderRadius: "10px",
    },
    select: {
      background: "transparent",
      color: "#fff",
      border: "none",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Profile</div>

      {/* Profile Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill="currentColor"
        viewBox="0 0 16 16"
        style={styles.profileIcon}
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>

      <h2 style={{ textAlign: "center" }}>Sign in</h2>
      <p style={styles.subText}>
        Save your tricounts to your profile, use tricount on multiple devices
        and get notifications.
      </p>

      {/* Sign-in Buttons */}
      <button style={{ ...styles.button, ...styles.apple }}>
        <FaApple /> Sign in with Apple
      </button>
      <button style={{ ...styles.button, ...styles.google }}>
        <FaGoogle /> Sign in with Google
      </button>
      <button style={{ ...styles.button, ...styles.facebook }}>
        <FaFacebookF /> Sign in with Facebook
      </button>
      <button style={{ ...styles.button, ...styles.email }}>
        <FaEnvelope /> Sign in with Email
      </button>

      {/* Preferences */}
      <div style={styles.section}>
        <h3 style={{ marginBottom: "10px" }}>Preferences</h3>

        <div style={styles.label}>
          <span>Language</span>
          <select
            style={styles.select}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Khmer</option>
          </select>
        </div>

        <div style={styles.label}>
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>
    </div>
  );
}
