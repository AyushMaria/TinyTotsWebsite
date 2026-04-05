import { Award, Heart, Dices, Bot, BookOpen } from 'lucide-react';

const philosophyPoints = [
  {
    icon: Award,
    title: '20+ Years of Experience',
    desc: 'Decades of nurturing young minds, building a legacy of educational excellence and trust.',
  },
  {
    icon: Heart,
    title: 'Safe & Joyful Environment',
    desc: 'A secure and happy space where children thrive, explore, and grow with confidence.',
  },
  {
    icon: Dices,
    title: 'Play-Based Learning',
    desc: 'Engaging activities that spark curiosity, foster creativity, and make learning fun.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Teaching Tools',
    desc: 'Innovative tools enhancing personalized learning and early cognitive development.',
  },
  {
    icon: BookOpen,
    title: 'Activity-Based Curriculum',
    desc: 'A dynamic curriculum focused on hands-on experiences and interactive exploration.',
  },
];

export default function Services() {
  return (
    <section id="our-philosophy" className="section-padding bg-pure-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-near-black">
            Our Philosophy
          </h2>
          <p className="text-secondary-gray mt-4 max-w-xl mx-auto">
            At Tiny Tots, we believe in a holistic approach to early childhood education, blending experience with innovation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophyPoints.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card group cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-light-surface">
                <Icon className="text-rausch-red" size={22} />
              </div>
              <h3 className="font-semibold text-near-black text-lg mb-2">{title}</h3>
              <p className="text-secondary-gray text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}