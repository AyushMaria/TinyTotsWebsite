
const events = [
  {
    id: 1,
    title: 'Annual Sports Day',
    date: 'October 26, 2026',
    description: 'A day filled with fun races, games, and sportsmanship for all age groups. Cheer on our little athletes!',
    image: '/images/tinytots-image-29.jpg',
    type: 'upcoming',
  },
  {
    id: 2,
    title: 'Creative Arts Workshop',
    date: 'November 15, 2026',
    description: 'Unleash your child\'s inner artist with painting, crafting, and sculpting activities. All materials provided.',
    image: '/images/tinytots-image-78.jpg',
    type: 'upcoming',
  },
  {
    id: 3,
    title: 'Storytelling Festival',
    date: 'September 10, 2026',
    description: 'Magical tales and puppet shows brought to life by professional storytellers. A treat for the imagination!',
    image: '/images/tinytots-image-79.jpg',
    type: 'past',
  },
  {
    id: 4,
    title: 'Science Exploration Day',
    date: 'August 20, 2026',
    description: 'Hands-on experiments and fascinating discoveries await! Young scientists explore the wonders of the world.',
    image: '/images/tinytots-image-80.jpg',
    type: 'past',
  },
];

export default function VibeAndVolley() {
  return (
    <section id="vibe-volley" className="section-padding bg-pure-white py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-near-black leading-tight mb-4">
            Vibe & Volley
          </h1>
          <p className="text-secondary-gray text-lg leading-relaxed max-w-xl mx-auto">
            Explore our exciting activities and upcoming events that make learning and growing a joyful experience.
          </p>
        </div>

        <h2 className="font-display text-3xl font-bold text-near-black mt-16 mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.filter(event => event.type === 'upcoming').map((event) => (
            <div key={event.id} className="card group cursor-pointer overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="font-semibold text-near-black text-lg mb-2 group-hover:text-rausch-red transition-colors">
                  {event.title}
                </h3>
                <p className="text-secondary-gray text-sm mb-2">{event.date}</p>
                <p className="text-secondary-gray text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold text-near-black mb-8">Past Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.filter(event => event.type === 'past').map((event) => (
            <div key={event.id} className="card group cursor-pointer overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="font-semibold text-near-black text-lg mb-2 group-hover:text-rausch-red transition-colors">
                  {event.title}
                </h3>
                <p className="text-secondary-gray text-sm mb-2">{event.date}</p>
                <p className="text-secondary-gray text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
