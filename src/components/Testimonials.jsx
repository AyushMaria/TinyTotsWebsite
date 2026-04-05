const testimonials = [
  { name: 'Amanda R.', role: 'Parent of 2 years old', quote: 'Teachers care deeply and keep us updated with photos, milestones, and daily smiles that brighten our day.' },
  { name: 'Jubair R.', role: 'Parent of 3 years old', quote: 'We truly love the wonderful balance of play, learning, and care that helps our child grow each and every day.' },
  { name: 'Joe Han', role: 'Parent of 2 years old', quote: 'Daily updates and caring staff give us peace of mind, knowing our child is happy, thriving, and well cared for.' },
  { name: 'Arman D.', role: 'Parent of 2 years old', quote: 'From playtime to nap time, the dedicated staff lovingly creates a safe, nurturing environment that feels just like home.' },
  { name: 'Ramin Dev', role: 'Parent of 4 years old', quote: 'Daily updates and caring staff give us peace of mind, knowing our child is happy, thriving, playful, and well cared for.' },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            What the Parents Say
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, quote }) => (
            <div key={name} className="card flex flex-col justify-between">
              <div>
                <span className="text-4xl text-primary font-display">"</span>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">{quote}</p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                <img
                  src={`https://i.pravatar.cc/40?u=${name}`}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}