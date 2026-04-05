
export default function OurMission() {
  return (
    <section id="our-mission" className="section-padding max-w-7xl mx-auto py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-near-black leading-tight">
            Our Mission
          </h1>
          <p className="text-secondary-gray text-lg leading-relaxed max-w-lg">
            At Tiny Tots Kindergarten, our mission is to provide a nurturing and stimulating environment where every child can flourish. We are dedicated to fostering a love for learning, encouraging creativity, and building a strong foundation for future success through play-based and activity-oriented approaches.
          </p>
          <p className="text-secondary-gray text-base leading-relaxed max-w-lg">
            We believe in creating a safe, inclusive, and joyful space where children feel valued and empowered to explore their potential. Our experienced educators are committed to personalized attention, celebrating each child's unique strengths and guiding them on their developmental journey.
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="relative">
          <img
            src="/images/tinytots-image-6.jpg"
            alt="Children learning together"
            className="rounded-2xl object-cover w-full h-96 shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
