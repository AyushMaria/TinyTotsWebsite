import { ArrowRight } from 'lucide-react';

const posts = [
  {
    tag: 'Development',
    title: 'How Sensory Play Boosts Your Baby\'s Brain Development',
    desc: 'Discover the science behind sensory activities and how they create critical neural pathways.',
    date: 'March 12, 2026',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80',
  },
  {
    tag: 'Nutrition',
    title: 'Introducing Solids: A Guide for First-Time Parents',
    desc: 'Everything you need to know about starting your baby on solid foods safely and joyfully.',
    date: 'March 5, 2026',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    tag: 'Parenting',
    title: 'Building Trust: The Foundation of Early Childhood Care',
    desc: 'Why consistent routines and warm caregivers form the bedrock of emotional security.',
    date: 'Feb 28, 2026',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&q=80',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-peach">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 max-w-xs">
            The Latest from Our Blog
          </h2>
          <a href="#blog" className="hidden md:flex items-center gap-2 text-primary font-medium text-sm hover:underline">
            View All Posts <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(({ tag, title, desc, date, image }) => (
            <div key={title} className="bg-white rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              <img src={image} alt={title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-3">
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {tag}
                </span>
                <h3 className="font-semibold text-gray-800 leading-snug">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
                <p className="text-gray-400 text-xs pt-1">{date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}