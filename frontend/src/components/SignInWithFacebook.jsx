import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInWithFacebook() {
  const navigate = useNavigate();

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_FACEBOOK_APP_ID", // Replace with your Facebook App ID
        cookie: true,
        xfbml: false,
        version: "v16.0",
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Facebook login success:", response);
          navigate("/profile");
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div style={styles.container}>
      <h2>Sign in with Facebook</h2>
      <p>
        Use your Facebook account to sign in quickly and securely.
      </p>
      <div style={styles.form}>
        <button style={styles.button} onClick={handleFBLogin}>
          <svg
            style={{ marginRight: 10 }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M22.675 0h-21.35C.592 0 0 .592 0 1.324v21.351C0 23.408.592 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.917.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.592 1.324-1.324V1.324C24 .592 23.408 0 22.675 0z" />
          </svg>
          Sign in with Facebook
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
    backgroundColor: "#1877F2",
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
