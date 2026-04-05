import { Landmark, Sprout, Blocks } from 'lucide-react';

const facilities = [
  {
    icon: Landmark,
    title: 'Bright Spacious Classrooms',
    desc: 'Engaging learning environments designed to inspire creativity and collaborative play.',
  },
  {
    icon: Sprout,
    title: 'Outdoor Play Area',
    desc: 'A safe and expansive outdoor space for children to explore, run, and connect with nature.',
  },
  {
    icon: Blocks,
    title: 'Age-Appropriate Materials',
    desc: 'A rich collection of educational toys and resources tailored to support every stage of development.',
  },
];

export default function Features() {
  return (
    <section id="our-facilities" className="section-padding max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center bg-pure-white">
      <div>
        <img
          src="/images/tinytots-image-7.jpg"
          alt="Kindergarten classroom"
          className="rounded-2xl object-cover w-full h-96 shadow-card"
        />
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-near-black">
            Our Facilities
          </h2>
          <p className="text-secondary-gray mt-4 leading-relaxed">
            Designed with your child's growth and safety in mind, our facilities provide an ideal learning environment.
          </p>
        </div>
        <div className="space-y-6">
          {facilities.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="bg-light-surface w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="text-rausch-red" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-near-black">{title}</h4>
                <p className="text-secondary-gray text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}