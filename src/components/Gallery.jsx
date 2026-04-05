const images = [
  'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=400&q=80',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80',
  'https://images.unsplash.com/photo-1471286174890-9c112ac6476f?w=400&q=80',
  'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&q=80',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
  'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&q=80',
];

export default function Gallery() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Cherished Moments, Captured Daily
          </h2>
          <p className="text-gray-500 mt-4">
            A glimpse into the joyful, loving days your child experiences with us.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className={`rounded-3xl object-cover w-full ${
                i === 0 || i === 5 ? 'h-72' : 'h-52'
              } hover:scale-[1.02] transition-transform duration-300`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}