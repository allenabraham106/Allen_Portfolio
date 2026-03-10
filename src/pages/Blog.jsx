import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

// Placeholder — add your blog posts here later
const posts = [];

export default function Blog() {
  return (
    <div className="page">
      <div className="container">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="accent">Blog</span>
        </motion.h1>
        <motion.p
          className="page-intro"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Thoughts, tutorials, and updates.
        </motion.p>

        <motion.div
          className="blog-list"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {posts.length === 0 ? (
            <motion.div
              className="blog-empty"
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="blog-empty-icon">✎</div>
              <h3>No posts yet</h3>
              <p>
                Add your posts in <code>src/pages/Blog.jsx</code> — use the{" "}
                <code>posts</code> array and the list item layout as a template.
              </p>
            </motion.div>
          ) : (
            posts.map((post, i) => (
              <motion.article
                key={post.id || i}
                className="blog-card"
                variants={item}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <time className="blog-date">{post.date}</time>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                {post.slug && (
                  <a href={`/blog/${post.slug}`} className="blog-card-link">
                    Read more →
                  </a>
                )}
              </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
