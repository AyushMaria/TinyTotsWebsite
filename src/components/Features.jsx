import { Camera, Users, Target } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Daily Updates',
    desc: 'Get photos, videos, and notes about your child\'s activities and milestones.',
  },
  {
    icon: Users,
    title: 'Family Events',
    desc: 'Join us for fun family days, learning sessions, and celebrations throughout the year.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    desc: 'Set and track your baby\'s goals together, simply and clearly with our parent portal.',
  },
];

export default function Features() {
  return (
    <section className="section-padding max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <img
          src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80"
          alt="Child learning"
          className="rounded-4xl object-cover w-full h-96"
        />
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Building Bright Futures with Confidence
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            We know that nothing is more important than your children's safety
            and well-being. That's why we've implemented rigorous measures to
            ensure the best care on our platform.
          </p>
        </div>
        <div className="space-y-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="bg-primary/10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-gray-500 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}