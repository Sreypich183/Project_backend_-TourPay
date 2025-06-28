import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Request from './components/Request';
import Tourpay from './components/Tourpay';
import FreeCard from './components/FreeCard';
import NewTourpay from './components/NewTourpay';
import JoinTourpay from './components/JoinTourpay';
import ImportSplitwise from './components/ImportSplitwise';
import SignInWithEmail from './components/SignInWithEmail'
import SignInWithFacebook from './components/SignInWithFacebook';
import SignInWithGoogle from './components/SignInWithGoogle';
import SignInWithApple from './components/SignInWithApple';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tourpay />} />
        <Route path="/NewTourpay" element={<NewTourpay />} />
        <Route path="/JoinTourpay" element={<JoinTourpay />} />
        <Route path="/ImportSplitwise" element={<ImportSplitwise />} />
        <Route path="/freecard" element={<FreeCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/request" element={<Request />} />
        <Route path="/SignInWithEmail" element={<SignInWithEmail />} />
        <Route path="/SignInWithFacebook" element={<SignInWithFacebook />} />
        <Route path="/SignInWithGoogle" element={<SignInWithGoogle />} />
        <Route path="/SignInWithApple" element={<SignInWithApple />} />
      </Routes>

      <nav>
        <ul>
          <li><Link to="/">Tourpay</Link></li>
          <li><Link to="/request">Requests</Link></li>
          <li><Link to="/freecard">Free Card</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </Router>
  );
}
