import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authService } from "./services/auth";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import CityResults from "./pages/CityResults";
import LoggedOutHome from "./pages/LoggedOutHome";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🪔</div>
          <div className="text-2xl text-slate-700 font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LoggedOutHome onLoginClick={() => setShowAuthModal(true)} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLogin}
        />
      </>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} onLogin={handleLogin} onLogout={handleLogout} />
          }
        />
        <Route
          path="/city/:cityName"
          element={<CityResults user={user} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}