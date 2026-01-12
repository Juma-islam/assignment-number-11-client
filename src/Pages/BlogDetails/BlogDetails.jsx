import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";

const BlogDetails = () => {
  const { id } = useParams();

  // Demo data - In real project fetch by ID from API
  const blog = {
    id: Number(id),
    title: "The Future of Garment Manufacturing in 2026",
    category: "Industry Insights",
    author: "Zayan Ahmed",
    date: "January 10, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558444479-c8a027920927?q=80&w=1600&auto=format&fit=crop",
    content: `
      <p>Garment manufacturing is undergoing a seismic shift. As we enter 2026, the integration of AI-driven production lines, real-time data tracking, and predictive analytics is no longer optional — it's essential for survival in a highly competitive global market.</p>

      <p>The factories that embraced digital transformation early are already seeing efficiency gains of 35–50%. Real-time tracking systems allow production managers to detect bottlenecks instantly, reallocate resources dynamically, and maintain strict adherence to international delivery schedules.</p>

      <h2>The Rise of Smart & Connected Factories</h2>
      <p>South Asia, particularly Bangladesh, India and Vietnam, is rapidly becoming the epicenter of smart garment manufacturing. IoT sensors on every sewing machine, AI-powered quality inspection cameras, and cloud-based ERP systems now form the backbone of modern factories.</p>

      <p>Key benefits being realized in 2026 include:</p>
      <ul>
        <li>Up to 40% reduction in production lead time</li>
        <li>30–45% decrease in rework and defects</li>
        <li>Significant reduction in fabric waste through precise digital cutting</li>
        <li>Complete transparency for international buyers</li>
      </ul>

      <h2>Sustainability Through Technology</h2>
      <p>Environmental compliance is no longer a checkbox — it's a business requirement. Smart planning tools and AI forecasting help factories optimize fabric usage, reducing textile waste by 25–35% on average. Many brands now require digital proof of sustainable practices before placing large orders.</p>

      <blockquote>
        "In 2026, data is the new fabric. The factories that master real-time data will dominate the next decade of global garment production."
      </blockquote>

      <p>The future is already here — the question is whether your factory is ready to embrace it.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/60 dark:to-purple-950/40 transition-colors duration-500 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Insights
        </Link>

        {/* Blog Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium tracking-wide">
              {blog.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{blog.author}</p>
                <p className="text-xs">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{blog.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </motion.article>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="rounded-2xl overflow-hidden mb-16 shadow-2xl"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-105"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
        >
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Share & Next */}
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-8">
            <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all group">
              <Share2 size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">Share this article</span>
            </button>

            <Link
              to="/blog"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg group"
            >
              <span>Explore More Insights</span>
              <ArrowUpRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails;