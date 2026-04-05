export default function CTA() {
  return (
    <section id="enroll" className="section-padding">
      <div className="max-w-4xl mx-auto bg-primary rounded-4xl p-12 md:p-16 text-center space-y-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
          Give Your Little One the Loving Care They Deserve
        </h2>
        <p className="text-green-100 max-w-xl mx-auto">
          We provide a nurturing space for your child to thrive. Caring teachers
          and engaging activities fill each day with love and discovery.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="#contact"
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Enroll Now
          </a>
          <a
            href="#programs"
            className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}