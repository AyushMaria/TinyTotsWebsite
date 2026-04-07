const images = [
  '/images/tinytots-image-72.jpg',
  '/images/tinytots-image-73.jpg',
  '/images/tinytots-image-74.jpg',
  '/images/tinytots-image-75.jpg',
  '/images/tinytots-image-76.jpg',
  '/images/tinytots-image-77.jpg',
  '/images/tinytots-image-78.jpg',
  '/images/tinytots-image-79.jpg',
  '/images/tinytots-image-80.jpg',
  '/images/tinytots-image-2.jpg',
  '/images/tinytots-image-3.jpg',
  '/images/tinytots-image-4.jpg',
  '/images/tinytots-image-5.jpg',
  '/images/tinytots-image-6.jpg',
  '/images/tinytots-image-7.jpg',
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
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid">
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className={`rounded-xl object-cover w-full shadow-card
                  ${i % 3 === 0 ? 'h-52' : i % 3 === 1 ? 'h-72' : 'h-60'}
                  hover:scale-[1.02] transition-transform duration-300
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}