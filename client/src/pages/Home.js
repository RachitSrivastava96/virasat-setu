import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

export default function Home({ user, onLogin, onLogout }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/city/${searchCity.trim()}`);
    }
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Decorative Pattern Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative flex justify-between items-center px-4 md:px-10 py-6 bg-white/80 backdrop-blur-md shadow-md border-b-4 border-orange-500">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🪔</div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            विरासत सेतु • Virasat Setu
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">{languages.find(l => l.code === selectedLang)?.flag}</span>
              <span className="hidden md:inline">{languages.find(l => l.code === selectedLang)?.name}</span>
              <span className="text-xs">▼</span>
            </button>
            
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border-2 border-orange-200 z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center gap-3 ${
                      selectedLang === lang.code ? "bg-orange-100 font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-gray-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-md border-2 border-orange-200">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 shadow-md"
                />
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-4">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse delay-300"></div>
        
        <div className="relative mb-6 animate-bounce-slow">
          <div className="text-7xl md:text-8xl mb-4">🇮🇳</div>
        </div>
        
        <h2 className="relative text-4xl md:text-6xl font-extrabold mb-6 text-gray-800 leading-tight">
          Discover India's Soul,
          <br />
          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Beyond Tourist Maps
          </span>
        </h2>
        
        <p className="relative text-gray-700 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
          Explore hidden gems, local artisans, cultural hotspots, and authentic
          experiences across India. Connect with the heart of Bharat. 🪔
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-4 mb-16 w-full max-w-2xl">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
            <input
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full pl-14 pr-4 py-5 rounded-2xl bg-white border-3 border-orange-300 outline-none text-gray-800 placeholder-gray-500 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 shadow-lg text-lg font-medium"
              placeholder="Enter a city (e.g. Jaipur, Varanasi, Udaipur)"
            />
          </div>
          <button
            type="submit"
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Explore 🚀
          </button>
        </form>

        {/* Hot Places Section */}
        <div className="relative w-full max-w-7xl px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4 border-2 border-orange-300">
              <span className="text-orange-600 font-bold text-sm">TRENDING NOW</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              🔥 Hot Places to Visit
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked heritage destinations that showcase India's rich cultural tapestry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotPlaces.map((place, index) => (
              <div
                key={place.name}
                onClick={() => navigate(`/city/${place.name}`)}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-3 border-orange-100 hover:border-orange-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 opacity-20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-400 to-amber-400 opacity-20 rounded-tr-full"></div>
                
                {/* Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">{place.state}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {place.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-semibold group-hover:underline">
                      Explore More →
                    </span>
                    <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
                      🗺️
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 to-amber-400/0 group-hover:from-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="relative mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4 mb-20">
          <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-3 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">🛕</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
                Cultural Heritage
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Discover ancient temples, magnificent monuments, and historical sites that tell India's timeless stories
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Temples</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">Forts</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Palaces</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-3 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-amber-600 transition-colors">
                Local Artisans
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Meet master craftspeople and traditional artists preserving India's rich handicraft and art traditions
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">Crafts</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Textiles</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">Art</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-3 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">🍛</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
                Authentic Food
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Find hidden local eateries, street food treasures, and authentic regional cuisines that tourists miss
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Street Food</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">Cuisine</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative w-full max-w-4xl px-4 mb-20">
          <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 text-8xl">🪔</div>
              <div className="absolute bottom-4 right-4 text-8xl">🕉️</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-50">🇮🇳</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Explore Bharat's Soul?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of travelers discovering India's authentic experiences beyond the guidebooks
              </p>
              {!user && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-10 py-4 bg-white text-orange-600 font-bold text-lg rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 transform inline-flex items-center gap-3"
                >
                  Start Your Journey 🚀
                </button>
              )}
            </div>
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