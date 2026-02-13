import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

export default function Home({ user, onLogin, onLogout }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/city/${searchCity.trim()}`);
    }
  };

  // Hot places - hardcoded (no API call needed)
  const hotPlaces = [
    {
      name: "Jaipur",
      state: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      description: "The Pink City - Palaces, forts & vibrant markets",
    },
    {
      name: "Varanasi",
      state: "Uttar Pradesh",
      image:
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      description: "Spiritual capital - Ancient ghats & temples",
    },
    {
      name: "Hampi",
      state: "Karnataka",
      image:
        "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      description: "UNESCO site - Ancient ruins & boulders",
    },
    {
      name: "Udaipur",
      state: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800",
      description: "City of Lakes - Royal palaces & romance",
    },
    {
      name: "Pondicherry",
      state: "Tamil Nadu",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
      description: "French colony vibes - Beaches & cafes",
    },
    {
      name: "Khajuraho",
      state: "Madhya Pradesh",
      image:
        "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800",
      description: "Ancient temples - Intricate stone carvings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-amber-400">
          Virasat-Setu 🇮🇳
        </h1>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-amber-400"
              />
              <div className="text-sm">
                <div className="font-semibold">{user.name}</div>
                <div className="text-gray-400 text-xs">{user.email}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
          >
            Login / Sign Up
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          Discover India,
          <span className="text-amber-400"> Beyond Google Maps</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg mb-10">
          Explore hidden gems, local artisans, cultural hotspots, and authentic
          experiences across India.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-16">
          <input
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-[320px] p-4 rounded-xl bg-slate-800 outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-400"
            placeholder="Enter a city (e.g. Jaipur)"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
          >
            Explore
          </button>
        </form>

        {/* Hot Places Section */}
        <div className="w-full max-w-6xl">
          <h3 className="text-3xl font-bold mb-8 text-left">
            🔥 Hot Places to Visit
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotPlaces.map((place) => (
              <div
                key={place.name}
                onClick={() => navigate(`/city/${place.name}`)}
                className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h4 className="text-xl font-bold mb-1">{place.name}</h4>
                  <p className="text-amber-400 text-sm mb-2">{place.state}</p>
                  <p className="text-gray-400 text-sm">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <div className="bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl mb-3">🛕</div>
            <h3 className="text-xl font-bold mb-2">Cultural Heritage</h3>
            <p className="text-gray-400 text-sm">
              Discover temples, monuments, and historical sites
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-2">Local Artisans</h3>
            <p className="text-gray-400 text-sm">
              Meet craftspeople and traditional artists
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl mb-3">🍛</div>
            <h3 className="text-xl font-bold mb-2">Authentic Food</h3>
            <p className="text-gray-400 text-sm">
              Find hidden local eateries and street food
            </p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onLogin}
      />
    </div>
  );
}