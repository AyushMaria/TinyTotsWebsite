const images = [
  '/images/tinytots-image-72.jpg',
  '/images/tinytots-image-73.jpg',
  '/images/tinytots-image-74.jpg',
  '/images/tinytots-image-75.jpg',
  '/images/tinytots-image-76.jpg',
  '/images/tinytots-image-77.jpg',
];

export default function Gallery() {
  return (
    <section id="photo-gallery" className="section-padding bg-pure-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-near-black">
            Tiny Tots Memories - A Visual Journey
          </h2>
          <p className="text-secondary-gray mt-4">
            Relive the joyful moments and precious memories created every day at Tiny Tots.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className={`rounded-xl object-cover w-full shadow-card ${
                i === 0 || i === 5 ? 'h-72' : 'h-52'
              } hover:scale-[1.02] transition-transform duration-300`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}