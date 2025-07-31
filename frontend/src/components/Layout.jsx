import { Link, useLocation } from "react-router-dom"

const Layout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="container">
      <header className="header">
        <div className="logo">TourPay</div>
      </header>

      <main style={{ paddingBottom: "100px" }}>{children}</main>

      <nav className="tab-navigation">
        <Link to="/" className={`tab-item ${location.pathname === "/" ? "active" : ""}`}>
          <div className="tab-icon">🎒</div>
          Tours
        </Link>
        <Link to="/requests" className={`tab-item ${location.pathname === "/requests" ? "active" : ""}`}>
          <div className="tab-icon">💰</div>
          Requests
        </Link>
        <Link to="/free-card" className={`tab-item ${location.pathname === "/free-card" ? "active" : ""}`}>
          <div className="tab-icon">💳</div>
          Free Card
        </Link>
        <Link to="/profile" className={`tab-item ${location.pathname === "/profile" ? "active" : ""}`}>
          <div className="tab-icon">👤</div>
          Profile
        </Link>
      </nav>
    </div>
  )
}

export default Layout
