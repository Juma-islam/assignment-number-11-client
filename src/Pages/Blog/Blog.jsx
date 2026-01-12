import { motion } from "framer-motion";
import { Clock, User, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    category: "Industry Insights",
    title: "The Future of Garment Manufacturing in 2026",
    excerpt: "How automation, AI, and smart factories are reshaping South Asian production floors.",
    author: "Zayan Ahmed",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1558444479-c8a027920927?q=80&w=1200",
  },
  {
    id: 2,
    category: "Technology",
    title: "Real-time Tracking: Why Your Factory Needs It Now",
    excerpt: "Eliminate delays forever with instant visibility, cloud sync, and mobile alerts.",
    author: "Sarah Kabir",
    date: "Jan 05, 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
  },
  {
    id: 3,
    category: "Sustainability",
    title: "Reducing Textile Waste with Smart Planning",
    excerpt: "Data-driven fabric optimization, predictive cutting & zero-waste strategies.",
    author: "Tanvir Hasan",
    date: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200",
  },
];

const Blog = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wider mb-5">
            INDUSTRY JOURNAL
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            Latest Insights & Trends
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Expert perspectives on garment technology, efficiency, sustainability, and global market trends.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`
                group relative 
                bg-white/70 dark:bg-gray-800/40 
                backdrop-blur-xl 
                rounded-2xl 
                overflow-hidden 
                shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30
                border border-white/50 dark:border-gray-700/50
                hover:shadow-2xl hover:dark:shadow-indigo-700/40
                transition-all duration-400
              `}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta */}
                <div className="flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400 mb-5">
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {blog.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-tight">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all"
                >
                  Read Full Article
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 md:mt-20 text-center">
          <Link
            to="/blog"
            className={`
              inline-flex items-center gap-3 
              bg-gradient-to-r from-indigo-600 to-purple-700 
              text-white px-10 py-5 rounded-full 
              font-bold uppercase text-sm tracking-wider 
              shadow-lg hover:shadow-xl 
              hover:from-indigo-700 hover:to-purple-800 
              transition-all duration-300
            `}
          >
            View All Insights
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;