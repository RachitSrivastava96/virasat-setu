import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { placesService } from "../services/places";

export default function CityResults({ user, onLogout }) {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);

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
      setError("Failed to load city data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl animate-pulse mb-4">
            Loading {cityName}...
          </div>
          <div className="text-gray-400">
            Fetching places, artisans, and local gems...
          </div>
        </div>
      </div>
    );
  }

  if (error || !cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">😕 {error || "City not found"}</div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-amber-400 text-black rounded-lg font-semibold hover:bg-amber-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Extract data from backend response structure
  const { city, data } = cityData;
  const { monuments, restaurants, hotels, artisans } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-amber-400 hover:text-amber-300 text-2xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-amber-400">
            Virasat-Setu 🇮🇳
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-amber-400"
              />
              <div className="text-sm">
                <div className="font-semibold">{user.name}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* City Header */}
      <div className="px-10 py-12 border-b border-slate-800">
        <h1 className="text-5xl font-extrabold mb-3">{city.name}</h1>
        <p className="text-amber-400 text-xl mb-2">{city.state}</p>
        <p className="text-gray-400 max-w-3xl">{city.description}</p>
        {city.wikiUrl && (
          <a
            href={city.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm mt-2 inline-block"
          >
            Read more on Wikipedia →
          </a>
        )}
      </div>

      <div className="px-10 py-10">
        {/* Monuments & Heritage */}
        {monuments && monuments.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>🛕</span> Monuments & Heritage Sites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monuments.map((place) => (
                <div
                  key={place.id}
                  className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                    <p className="text-amber-400 text-sm mb-2">
                      {place.category}
                    </p>
                    {place.description && (
                      <p className="text-gray-400 text-sm">
                        {place.description}
                      </p>
                    )}
                    {place.address && (
                      <p className="text-gray-500 text-xs mt-2">
                        📍 {place.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Artisans */}
        {artisans && artisans.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>🎨</span> Local Artisans & Craftspeople
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artisans.map((artisan) => (
                <div
                  key={artisan.id}
                  className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  {artisan.images && artisan.images[0] && (
                    <img
                      src={artisan.images[0]}
                      alt={artisan.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{artisan.name}</h3>
                    <p className="text-amber-400 text-sm mb-2">
                      {artisan.specialty}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {artisan.description}
                    </p>
                    {artisan.address && (
                      <p className="text-gray-500 text-xs">
                        📍 {artisan.address}
                      </p>
                    )}
                    {artisan.contact && artisan.contact.phone && (
                      <p className="text-gray-500 text-xs">
                        📞 {artisan.contact.phone}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restaurants & Food */}
        {restaurants && restaurants.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>🍛</span> Authentic Food Spots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-amber-400 text-sm mb-2">
                      {restaurant.category}
                    </p>
                    {restaurant.description && (
                      <p className="text-gray-400 text-sm">
                        {restaurant.description}
                      </p>
                    )}
                    {restaurant.address && (
                      <p className="text-gray-500 text-xs mt-2">
                        📍 {restaurant.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hotels */}
        {hotels && hotels.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span>🏨</span> Places to Stay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                    <p className="text-amber-400 text-sm mb-2">
                      {hotel.category}
                    </p>
                    {hotel.address && (
                      <p className="text-gray-500 text-xs">
                        📍 {hotel.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!monuments || monuments.length === 0) &&
          (!artisans || artisans.length === 0) &&
          (!restaurants || restaurants.length === 0) && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">
                No data available yet
              </h3>
              <p className="text-gray-400">
                We're still gathering information about {cityName}. Check back
                soon!
              </p>
            </div>
          )}
      </div>
    </div>
  );
}