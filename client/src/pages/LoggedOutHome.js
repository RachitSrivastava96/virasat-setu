import { useState } from "react";

export default function LoggedOutHome({ onLoginClick }) {
  const [language, setLanguage] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🚩" },
    { code: "ta", name: "தமிழ்", flag: "🏴" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Border Pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-red-500 to-orange-600"></div>

      <div className="relative z-10">
        {/* Header */}
        <nav className="flex justify-between items-center px-10 py-6 bg-white/90 backdrop-blur-md shadow-lg border-b-4 border-orange-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="text-4xl animate-pulse">🪔</div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Virasat Setu
              </h1>
              <p className="text-xs text-orange-600 font-semibold">विरासत सेतु</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-all border-2 border-orange-300"
              >
                <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
                <span className="text-sm font-semibold text-orange-800">
                  {languages.find(l => l.code === language)?.name}
                </span>
                <span className="text-orange-600">▼</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors ${
                        language === lang.code ? "bg-orange-100" : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-semibold text-slate-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onLoginClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-orange-400"
            >
              Login / Sign Up
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-10 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 animate-bounce">
              <span className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-sm font-semibold border-2 border-orange-300 shadow-lg inline-flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <span>Discover Bharat's Living Heritage</span>
                <span className="text-xl">✨</span>
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                Journey Beyond
              </span>
              <br />
              <span className="text-slate-800 relative">
                the Tourist Trail
                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              Connect with artisans, explore forgotten monuments, savor authentic flavors, 
              and experience India's cultural tapestry like never before.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={onLoginClick}
                className="group px-12 py-5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-amber-600 text-white text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 inline-flex items-center gap-3 border-4 border-orange-300"
              >
                <span>Start Your Journey</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </button>
              
              <button
                className="px-10 py-5 rounded-full bg-white text-orange-600 text-lg font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 border-4 border-orange-300"
              >
                🎥 Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { num: "25+", label: "Heritage Cities" },
                { num: "500+", label: "Verified Artisans" },
                { num: "10k+", label: "Happy Travelers" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {stat.num}
                  </div>
                  <div className="text-sm text-slate-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards with Indian Motifs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: "🛕",
                title: "Sacred Spaces",
                desc: "Temples, forts & forgotten monuments",
                gradient: "from-orange-400 via-red-500 to-pink-500",
                bg: "bg-gradient-to-br from-orange-50 to-red-50",
                shadow: "shadow-orange-200"
              },
              {
                icon: "🎨",
                title: "Master Artisans",
                desc: "Meet India's craft custodians",
                gradient: "from-amber-400 via-orange-500 to-red-500",
                bg: "bg-gradient-to-br from-amber-50 to-orange-50",
                shadow: "shadow-amber-200"
              },
              {
                icon: "🍛",
                title: "Authentic Rasoi",
                desc: "Family recipes & street legends",
                gradient: "from-red-400 via-pink-500 to-orange-500",
                bg: "bg-gradient-to-br from-red-50 to-pink-50",
                shadow: "shadow-red-200"
              },
              {
                icon: "🏡",
                title: "Heritage Stays",
                desc: "Havelis, homestays & royal palaces",
                gradient: "from-yellow-400 via-amber-500 to-orange-500",
                bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
                shadow: "shadow-yellow-200"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.bg} rounded-3xl p-8 border-4 border-orange-200 hover:border-orange-400 transition-all duration-500 hover:shadow-2xl ${item.shadow} hover:-translate-y-3 cursor-pointer group relative overflow-hidden`}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-orange-400"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                
                <div className={`text-5xl mb-5 inline-block p-5 rounded-3xl bg-gradient-to-br ${item.gradient} shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="text-orange-600 font-bold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  Explore <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indian Heritage Cities Showcase */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-20 border-4 border-orange-300 relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-200 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-200 rounded-br-3xl"></div>
            
            <div className="text-center mb-12 relative z-10">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-3 text-4xl mb-2">
                  <span className="animate-bounce">🌟</span>
                  <span className="animate-bounce delay-100">🏰</span>
                  <span className="animate-bounce delay-200">🌟</span>
                </div>
              </div>
              <h2 className="text-5xl font-bold text-slate-800 mb-4">
                Timeless Cities Await
              </h2>
              <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                Begin your exploration with India's most storied destinations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
              {[
                { city: "Jaipur", emoji: "🏰", color: "pink", desc: "The Pink City" },
                { city: "Varanasi", emoji: "🕉️", color: "orange", desc: "Eternal City" },
                { city: "Hampi", emoji: "🗿", color: "amber", desc: "Stone Wonders" },
                { city: "Udaipur", emoji: "🏛️", color: "blue", desc: "City of Lakes" },
                { city: "Khajuraho", emoji: "🛕", color: "red", desc: "Temple Art" },
                { city: "Pondicherry", emoji: "🌊", color: "cyan", desc: "French Quarter" },
              ].map((place) => (
                <div
                  key={place.city}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-amber-100 to-orange-50 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer border-4 border-orange-200 hover:border-orange-400"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                      {place.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{place.city}</h3>
                    <p className="text-sm text-orange-600 font-semibold mb-3">{place.desc}</p>
                    <div className="flex items-center gap-2 text-orange-600 font-bold group-hover:translate-x-2 transition-transform">
                      <span>Explore</span>
                      <span className="text-xl">→</span>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Virasat Setu */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-slate-800 mb-4">
                Why <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Virasat Setu</span>?
              </h2>
              <div className="flex justify-center gap-2 text-2xl">
                <span>✨</span>
                <span>🎯</span>
                <span>✨</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Community-Verified",
                  desc: "Every place, every artisan — authenticated by travelers and locals",
                  icon: "✓",
                  gradient: "from-green-400 to-emerald-500"
                },
                {
                  title: "Support Local Artisans",
                  desc: "Connect directly with craftspeople keeping traditions alive",
                  icon: "🤝",
                  gradient: "from-orange-400 to-red-500"
                },
                {
                  title: "Beyond Google Maps",
                  desc: "Discover hidden gems that algorithms miss",
                  icon: "🗺️",
                  gradient: "from-blue-400 to-purple-500"
                },
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white rounded-3xl p-10 shadow-xl border-4 border-orange-100 hover:border-orange-400 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-600 rounded-3xl p-12 shadow-2xl mb-16 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-6">💬</div>
              <blockquote className="text-2xl md:text-3xl font-semibold text-white mb-6 italic max-w-4xl mx-auto leading-relaxed">
                "Virasat Setu connected me with a 5th-generation block printer in Jaipur. 
                An experience Google could never give me!"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg">Priya Sharma</div>
                  <div className="text-orange-100">Cultural Explorer</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 rounded-3xl p-16 shadow-2xl relative overflow-hidden border-4 border-orange-300">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ready to Experience Real India?
              </h2>
              <p className="text-orange-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of travelers discovering authentic stories, crafts, and flavors 
                across the incredible tapestry of Bharat.
              </p>
              <button
                onClick={onLoginClick}
                className="group px-16 py-6 rounded-full bg-white text-orange-600 text-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 inline-flex items-center gap-4 border-4 border-orange-300"
              >
                <span>Begin Your Journey</span>
                <span className="text-3xl group-hover:rotate-90 transition-transform">🪔</span>
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">Instant Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">No Credit Card</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 mt-20 border-t-4 border-orange-500 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">🪔</div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                      Virasat Setu
                    </p>
                    <p className="text-orange-400 text-sm font-semibold">विरासत सेतु</p>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4 max-w-md">
                  Bridging the gap between travelers and India's authentic heritage. 
                  Discover, connect, preserve.
                </p>
                <div className="flex gap-4">
                  {["📘", "📷", "🐦", "📺"].map((icon, idx) => (
                    <button key={idx} className="w-12 h-12 rounded-full bg-slate-800 hover:bg-orange-600 transition-colors flex items-center justify-center text-2xl border-2 border-slate-700 hover:border-orange-400">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-orange-400">Explore</h4>
                <ul className="space-y-2">
                  {["Heritage Cities", "Artisans", "Food Trails", "Stays", "Culture"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                        <span>→</span>
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-orange-400">Support</h4>
                <ul className="space-y-2">
                  {["About Us", "Contact", "Help Center", "Community", "Partners"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                        <span>→</span>
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © 2026 Virasat Setu. Made with ❤️ for Bharat | All Rights Reserved
              </p>
              <div className="flex gap-6 text-sm text-slate-500">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
