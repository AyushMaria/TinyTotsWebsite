export default function Hero() {
  return (
    <section
      id="home"
      className="section-padding max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
    >
      {/* Text */}
      <div className="space-y-6">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-near-black leading-tight">
          Unlock Your Child's Potential
        </h1>
        <p className="text-secondary-gray text-lg leading-relaxed max-w-lg">
          Discover a fun and nurturing environment for your child's early education.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href="#enroll" className="btn-primary">
            Enroll Now
          </a>
          <a href="#learn-more" className="btn-outline">
            Learn More
          </a>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        <img
          src="/images/tinytots-image-2.jpg"
          alt="Happy child"
          className="rounded-2xl object-cover w-full h-64 mt-8 shadow-card"
        />
        <img
          src="/images/tinytots-image-3.jpg"
          alt="Children playing"
          className="rounded-2xl object-cover w-full h-64 shadow-card"
        />
        <img
          src="/images/tinytots-image-4.jpg"
          alt="Learning"
          className="rounded-2xl object-cover w-full h-48 shadow-card"
        />
        <img
          src="/images/tinytots-image-5.jpg"
          alt="Care"
          className="rounded-2xl object-cover w-full h-48 mt-4 shadow-card"
        />
      </div>
    </section>
  );
}