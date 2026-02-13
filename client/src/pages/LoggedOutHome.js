export default function LoggedOutHome({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🪔</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Virasat Setu
          </h1>
        </div>
        <button
          onClick={onLoginClick}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Login / Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-10 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold border-2 border-orange-300">
              🇮🇳 Discover Bharat's Living Heritage
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Journey Beyond
            </span>
            <br />
            <span className="text-slate-800">the Tourist Trail</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Connect with artisans, explore forgotten monuments, savor authentic flavors, 
            and experience India's cultural tapestry like never before.
          </p>

          <button
            onClick={onLoginClick}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Start Your Journey <span className="text-2xl">→</span>
          </button>
        </div>

        {/* Feature Cards with Indian Motifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: "🛕",
              title: "Sacred Spaces",
              desc: "Temples, forts & forgotten monuments",
              gradient: "from-orange-400 to-red-500",
              bg: "bg-orange-50"
            },
            {
              icon: "🎨",
              title: "Master Artisans",
              desc: "Meet India's craft custodians",
              gradient: "from-amber-400 to-orange-500",
              bg: "bg-amber-50"
            },
            {
              icon: "🍛",
              title: "Authentic Rasoi",
              desc: "Family recipes & street legends",
              gradient: "from-red-400 to-pink-500",
              bg: "bg-red-50"
            },
            {
              icon: "🏡",
              title: "Heritage Stays",
              desc: "Havelis, homestays & royal palaces",
              gradient: "from-yellow-400 to-amber-500",
              bg: "bg-yellow-50"
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
            >
              <div className={`text-5xl mb-4 inline-block p-4 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Indian Heritage Cities Showcase */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-20 border-4 border-orange-200">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              Timeless Cities Await
            </h2>
            <p className="text-slate-600 text-lg">
              Begin your exploration with India's most storied destinations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { city: "Jaipur", emoji: "🏰", color: "pink" },
              { city: "Varanasi", emoji: "🕉️", color: "orange" },
              { city: "Hampi", emoji: "🗿", color: "amber" },
              { city: "Udaipur", emoji: "🏛️", color: "blue" },
              { city: "Khajuraho", emoji: "🛕", color: "red" },
              { city: "Pondicherry", emoji: "🌊", color: "cyan" },
            ].map((place) => (
              <div
                key={place.city}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-orange-300"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {place.emoji}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{place.city}</h3>
                <div className="mt-2 text-sm text-orange-600 font-semibold">
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Virasat Setu */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-12">
            Why <span className="text-orange-600">Virasat Setu</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Community-Verified",
                desc: "Every place, every artisan — authenticated by travelers and locals",
                icon: "✓"
              },
              {
                title: "Support Local Artisans",
                desc: "Connect directly with craftspeople keeping traditions alive",
                icon: "🤝"
              },
              {
                title: "Beyond Google Maps",
                desc: "Discover hidden gems that algorithms miss",
                icon: "🗺️"
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-16 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Real India?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic stories, crafts, and flavors.
          </p>
          <button
            onClick={onLoginClick}
            className="px-12 py-5 rounded-full bg-white text-orange-600 text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
          >
            <span>Begin Your Journey</span>
            <span className="text-2xl">🪔</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-3xl">🪔</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Virasat Setu
            </p>
          </div>
          <p className="text-slate-400">
            Bridging Heritage, Connecting Hearts | Made with ❤️ for Bharat
          </p>
        </div>
      </footer>
    </div>
  );
}
