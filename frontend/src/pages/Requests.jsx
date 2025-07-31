import { useState } from 'react';

const Requests = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const handleConnectBank = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulate bank connection API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your backend API here
      // const response = await connectBankAccount();
      // if (!response.ok) throw new Error('Connection failed');
      
      setIsConnected(true);
    } catch (err) {
      setError(err.message || 'Failed to connect bank account');
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <div className="empty-state">
        <div style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "#333",
          margin: "0 auto 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "#4CAF50",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "30px",
          }}>
            ✓
          </div>
        </div>
        
        <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
          Bank Account Connected
        </h1>
        
        <p style={{ 
          fontSize: "16px", 
          color: "#888", 
          marginBottom: "40px",
          textAlign: "center",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          You can now request money from your tour group members.
        </p>
        
        <div style={{ textAlign: "center" }}>
          <button 
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              background: "#007AFF",
              color: "white",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Create Payment Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "#333",
        margin: "0 auto 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "60px",
          height: "40px",
          background: "#007AFF",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "20px",
        }}>
          🔗
        </div>
      </div>

      <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
        Request Money for Tour Expenses
      </h1>

      <p style={{ 
        fontSize: "16px", 
        color: "#888", 
        marginBottom: "10px",
        textAlign: "center" 
      }}>
        <strong>Powered by bunq</strong>
      </p>

      <p style={{ 
        fontSize: "16px", 
        color: "#888", 
        marginBottom: "40px",
        textAlign: "center",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        Connect your bank account to create payment requests for your tour expenses.
      </p>

      {error && (
        <p style={{ 
          color: "#FF4444", 
          textAlign: "center",
          marginBottom: "20px"
        }}>
          {error}
        </p>
      )}

      <div style={{ textAlign: "center" }}>
        <button 
          onClick={handleConnectBank}
          disabled={isConnecting}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            background: isConnecting ? "#555" : "#007AFF",
            color: "white",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            minWidth: "200px"
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Bank Account'}
        </button>
      </div>
    </div>
  );
};

export default Requests;