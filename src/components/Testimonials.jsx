const teachers = [
  { name: 'Our Educator 1', qualities: 'Nurturing and experienced educator dedicated to fostering a love for learning in young children.', image: '/images/tinytots-image-23.jpg' },
  { name: 'Our Educator 2', qualities: 'Passionate about early childhood development, creating engaging and interactive learning experiences.', image: '/images/tinytots-image-24.jpg' },
  { name: 'Our Educator 3', qualities: 'Highly trained in modern early childhood education methodologies, inspiring curiosity and creativity.', image: '/images/tinytots-image-25.jpg' },
];

export default function Testimonials() {
  return (
    <section id="our-teachers" className="section-padding bg-pure-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-near-black">
            Our Teachers
          </h2>
          <p className="text-secondary-gray mt-4 max-w-xl mx-auto">
            Dedicated and passionate educators, shaping young minds with care and expertise.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(({ name, qualities, image }) => (
            <div key={name} className="card flex flex-col justify-between">
              <div>
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover object-top mx-auto mb-4 shadow-md"
                />
                <h3 className="font-semibold text-near-black text-lg text-center mb-2">{name}</h3>
                <p className="text-secondary-gray text-sm leading-relaxed text-center">{qualities}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}