
const blogPosts = [
  {
    id: 1,
    title: 'The Importance of Play-Based Learning in Early Childhood',
    excerpt: 'Discover how play-based learning fosters creativity, problem-solving skills, and social development in young children.',
    image: '/images/tinytots-image-78.jpg',
  },
  {
    id: 2,
    title: 'Nurturing Emotional Intelligence from a Young Age',
    excerpt: 'Learn strategies for helping children understand and manage their emotions, building empathy and resilience.',
    image: '/images/tinytots-image-79.jpg',
  },
  {
    id: 3,
    title: 'Activity-Based Curriculum: Making Learning Fun and Engaging',
    excerpt: 'Explore how our activity-based curriculum transforms traditional lessons into exciting hands-on experiences.',
    image: '/images/tinytots-image-80.jpg',
  },
  {
    id: 4,
    title: 'The Role of AI in Modern Early Childhood Education',
    excerpt: 'Understand how AI-powered tools are enhancing personalized learning and cognitive development at Tiny Tots.',
    image: '/images/tinytots-image-26.jpg',
  },
  {
    id: 5,
    title: 'Building Confidence: A Guide for Parents and Educators',
    excerpt: 'Practical tips and insights on fostering self-esteem and confidence in young children for a bright future.',
    image: '/images/tinytots-image-27.jpg',
  },
  {
    id: 6,
    title: 'Outdoor Exploration: Connecting Children with Nature',
    excerpt: 'The benefits of outdoor play and how we integrate nature exploration into our daily activities.',
    image: '/images/tinytots-image-28.jpg',
  },
];

export default function BlogPage() {
  return (
    <section id="blog" className="section-padding bg-pure-white py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-near-black leading-tight mb-4">
            Our Blog
          </h1>
          <p className="text-secondary-gray text-lg leading-relaxed max-w-xl mx-auto">
            Stay updated with the latest insights, tips, and stories from Tiny Tots Kindergarten.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="card group cursor-pointer overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="font-semibold text-near-black text-lg mb-2 group-hover:text-rausch-red transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary-gray text-sm leading-relaxed">{post.excerpt}</p>
                <a href="#" className="inline-block mt-4 text-rausch-red text-sm font-medium hover:underline">
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
