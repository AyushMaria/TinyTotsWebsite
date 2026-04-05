export default function Hero() {
  return (
    <section
      id="home"
      className="section-padding max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
    >
      {/* Text */}
      <div className="space-y-6">
        <span className="inline-block bg-softYellow text-primary-dark text-sm font-medium px-4 py-1.5 rounded-full">
          🌱 Trusted by 25,000+ families
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Nurturing Little Ones with{' '}
          <span className="text-primary">Love</span> and Care
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
          A safe, fun, and caring environment. Where safety, learning, and joy
          come together for your child's bright beginning.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href="#enroll" className="btn-primary">
            Enroll Your Child
          </a>
          <a href="#programs" className="btn-outline">
            View Programs
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/40?img=${i + 10}`}
                alt="Parent"
                className="w-9 h-9 rounded-full border-2 border-cream object-cover"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="text-gray-800 font-semibold">25K+ parents</span>{' '}
            trust us with their little ones
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        <img
          src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80"
          alt="Happy child"
          className="rounded-4xl object-cover w-full h-64 mt-8"
        />
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80"
          alt="Children playing"
          className="rounded-4xl object-cover w-full h-64"
        />
        <img
          src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80"
          alt="Learning"
          className="rounded-4xl object-cover w-full h-48"
        />
        <img
          src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&q=80"
          alt="Care"
          className="rounded-4xl object-cover w-full h-48 mt-4"
        />
      </div>
    </section>
  );
}