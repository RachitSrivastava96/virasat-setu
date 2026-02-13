import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { placesService } from "../services/places";
import { t } from "../utils/translations";

export default function CityResults({ user, onLogout }) {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  ];

  useEffect(() => {
    loadCityData();
  }, [cityName]);

  const loadCityData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await placesService.getCityData(cityName);
      console.log("City data received:", data); // Debug log
      setCityData(data);
    } catch (err) {
      setError(t(selectedLang, 'cityNotFound'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOnMap = () => {
    if (cityData && cityData.city) {
      const { latitude, longitude, name } = cityData.city;
      if (latitude && longitude) {
        // Open Google Maps with coordinates
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(mapsUrl, '_blank');
      } else {
        // Fallback to search by city name
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
        window.open(mapsUrl, '_blank');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl animate-bounce mb-6">🗺️</div>
          <div className="text-3xl font-bold text-gray-800 animate-pulse mb-4">
            {t(selectedLang, 'loading')} {cityName}...
          </div>
          <div className="text-gray-600 text-lg">
            {t(selectedLang, 'fetchingData')}
          </div>
          <div className="mt-6 flex gap-2 justify-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border-3 border-orange-200 max-w-md">
          <div className="text-8xl mb-6 animate-bounce">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {error || t(selectedLang, 'cityNotFound')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t(selectedLang, 'cityNotFoundDesc')}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
          >
            {t(selectedLang, 'goBackHome')}
          </button>
        </div>
      </div>
    );
  }

  // Extract data from backend response structure
  const { city, data } = cityData;
  const { monuments, restaurants, hotels, artisans } = data;

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
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-orange-600 hover:text-orange-700 text-3xl hover:scale-110 transition-all duration-300 bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          >
            ←
          </button>
          <div className="flex items-center gap-3">
            <div className="text-3xl">🪔</div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Virasat Setu
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="text-lg">{languages.find(l => l.code === selectedLang)?.flag}</span>
              <span className="hidden md:inline text-sm">{languages.find(l => l.code === selectedLang)?.name}</span>
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

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-md border-2 border-orange-200">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 shadow-md"
                />
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t(selectedLang, 'logout')}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* City Header */}
      <div className="relative px-4 md:px-10 py-16 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-8 left-8 text-9xl">🕉️</div>
          <div className="absolute bottom-8 right-8 text-9xl">🪔</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px]">🇮🇳</div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/90 mb-6 text-sm md:text-base">
            <button onClick={() => navigate("/")} className="hover:text-white hover:underline">
              {t(selectedLang, 'home')}
            </button>
            <span>→</span>
            <span className="font-semibold text-white">{city.name}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            {city.name}
          </h1>
          <p className="text-white/95 text-xl md:text-2xl mb-3 font-semibold">{city.state}</p>
          <p className="text-white/90 text-base md:text-lg max-w-3xl leading-relaxed mb-6">
            {city.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {city.wikiUrl && (
              <a
                href={city.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                {t(selectedLang, 'readMoreWiki')}
              </a>
            )}
            <button 
              onClick={handleViewOnMap}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:scale-105 transform"
            >
              {t(selectedLang, 'viewOnMap')}
            </button>
          </div>
        </div>
      </div>

      <div className="relative px-4 md:px-10 py-12">
        {/* Monuments & Heritage */}
        {monuments && monuments.length > 0 && (
          <section className="mb-20">
            {/* Section Header */}
            <div className="mb-10">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4 border-2 border-orange-300">
                <span className="text-orange-600 font-bold text-sm">{t(selectedLang, 'heritageSites')}</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gray-800 flex items-center gap-4">
                <span className="text-5xl">🛕</span>
                {t(selectedLang, 'monumentsTitle')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t(selectedLang, 'monumentsDesc')} {city.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {monuments.map((place, index) => (
                <div
                  key={place.id}
                  className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-3 border-orange-100 hover:border-orange-300 cursor-pointer transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Corners */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 opacity-20 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-400 to-amber-400 opacity-20 rounded-tr-full"></div>

                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-xs">{place.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                      {place.name}
                    </h3>
                    {place.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {place.description}
                      </p>
                    )}
                    {place.address && (
                      <p className="text-gray-500 text-xs flex items-start gap-2">
                        <span className="text-orange-500">📍</span>
                        <span>{place.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 to-amber-400/0 group-hover:from-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Artisans */}
        {artisans && artisans.length > 0 && (
          <section className="mb-20">
            {/* Section Header */}
            <div className="mb-10">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4 border-2 border-amber-300">
                <span className="text-amber-600 font-bold text-sm">{t(selectedLang, 'localCraftspeople')}</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gray-800 flex items-center gap-4">
                <span className="text-5xl">🎨</span>
                {t(selectedLang, 'artisansTitle')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t(selectedLang, 'artisansDesc')} {city.name}{t(selectedLang, 'artisansDescSuffix')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artisans.map((artisan, index) => (
                <div
                  key={artisan.id}
                  className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-3 border-amber-100 hover:border-amber-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                  {artisan.images && artisan.images[0] && (
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={artisan.images[0]}
                        alt={artisan.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-white font-bold text-sm">{artisan.specialty}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors">
                      {artisan.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {artisan.description}
                    </p>
                    <div className="space-y-2">
                      {artisan.address && (
                        <p className="text-gray-500 text-sm flex items-start gap-2">
                          <span className="text-amber-500">📍</span>
                          <span>{artisan.address}</span>
                        </p>
                      )}
                      {artisan.contact && artisan.contact.phone && (
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                          <span className="text-amber-500">📞</span>
                          <span>{artisan.contact.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restaurants & Food */}
        {restaurants && restaurants.length > 0 && (
          <section className="mb-20">
            {/* Section Header */}
            <div className="mb-10">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4 border-2 border-orange-300">
                <span className="text-orange-600 font-bold text-sm">{t(selectedLang, 'culinaryDelights')}</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gray-800 flex items-center gap-4">
                <span className="text-5xl">🍛</span>
                {t(selectedLang, 'foodTitle')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t(selectedLang, 'foodDesc')} {city.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-3 border-orange-100 hover:border-orange-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 opacity-20 rounded-bl-full"></div>

                  <div className="relative overflow-hidden h-56">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-xs">{restaurant.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    {restaurant.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {restaurant.description}
                      </p>
                    )}
                    {restaurant.address && (
                      <p className="text-gray-500 text-xs flex items-start gap-2">
                        <span className="text-orange-500">📍</span>
                        <span>{restaurant.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 to-amber-400/0 group-hover:from-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hotels */}
        {hotels && hotels.length > 0 && (
          <section className="mb-20">
            {/* Section Header */}
            <div className="mb-10">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4 border-2 border-amber-300">
                <span className="text-amber-600 font-bold text-sm">{t(selectedLang, 'accommodations')}</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gray-800 flex items-center gap-4">
                <span className="text-5xl">🏨</span>
                {t(selectedLang, 'hotelsTitle')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t(selectedLang, 'hotelsDesc')} {city.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-3 border-amber-100 hover:border-amber-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 opacity-20 rounded-bl-full"></div>

                  <div className="relative overflow-hidden h-56">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-xs">{hotel.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-amber-600 transition-colors">
                      {hotel.name}
                    </h3>
                    {hotel.address && (
                      <p className="text-gray-500 text-sm flex items-start gap-2">
                        <span className="text-amber-500">📍</span>
                        <span>{hotel.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!monuments || monuments.length === 0) &&
          (!artisans || artisans.length === 0) &&
          (!restaurants || restaurants.length === 0) && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl border-3 border-orange-200 mx-4">
              <div className="text-8xl mb-6 animate-pulse">🔍</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                {t(selectedLang, 'noData')}
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                {t(selectedLang, 'noDataDesc')} {cityName}{t(selectedLang, 'noDataDescSuffix')}
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
              >
                {t(selectedLang, 'exploreOtherCities')}
              </button>
            </div>
          )}
      </div>
    </div>
  );
}