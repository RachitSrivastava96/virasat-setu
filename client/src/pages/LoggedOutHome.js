export default function LoggedOutHome({ onLoginClick }) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-amber-400">Virasat-Setu</h1>
        <button
          onClick={onLoginClick}
          className="px-6 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
        >
          Login / Sign Up
        </button>
      </nav>

      <section className="px-10 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-amber-400 mb-4">
              Discover India
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              A living atlas of heritage, crafts, and local stories.
            </h2>
            <p className="text-gray-400 max-w-xl text-lg mb-8">
              Virasat-Setu helps you explore monuments, artisans, and authentic food
              beyond the usual tourist trail. Log in to personalize your journey.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              {
                title: "Monuments",
                desc: "Hidden forts, temples, and stories.",
                icon: "🛕",
              },
              {
                title: "Artisans",
                desc: "Meet master craftspeople nearby.",
                icon: "🎨",
              },
              {
                title: "Food Trails",
                desc: "Local eats you will remember.",
                icon: "🍛",
              },
              {
                title: "Stays",
                desc: "Heritage stays and homestays.",
                icon: "🏡",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Curated city guides",
              detail: "Authentic highlights with verified sources.",
            },
            {
              title: "Local artisan network",
              detail: "Support craft clusters directly.",
            },
            {
              title: "Personal travel collections",
              detail: "Save places and build itineraries.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800"
            >
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
