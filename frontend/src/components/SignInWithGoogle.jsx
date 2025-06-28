import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInWithGoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Identity Services SDK
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Wait for SDK to load and then initialize the button
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace this with your actual client ID
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "filled_blue",
          size: "large",
          width: "100%",
        }
      );
    };
  }, []);

  const handleGoogleResponse = (response) => {
    console.log("Google JWT ID token:", response.credential);

    // You can decode or send the token to your backend here
    // e.g., jwt_decode(response.credential)

    navigate("/profile");
  };

  return (
    <div style={styles.container}>
      <h2>Sign in with Google</h2>
      <p>
        Use your Google account to sign in and access your profile.
      </p>
      <div style={styles.form}>
        <div id="googleSignInDiv" style={styles.googleButton}></div>
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
    width: "100%",
  },
  googleButton: {
    width: "100%", // force the button to full width
    display: "flex",
    justifyContent: "center",
  },
};
