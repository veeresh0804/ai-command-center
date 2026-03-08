import { ScrollReveal } from "./ScrollAnimations";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

const blogPosts = [
  {
    title: "Building a Semantic Search Engine with Python",
    description: "A deep dive into creating an AI-powered search platform using NLP techniques, vector embeddings, and efficient indexing strategies.",
    date: "Mar 2026",
    readTime: "8 min read",
    tags: ["AI", "NLP", "Python"],
  },
  {
    title: "Understanding Transformer Architectures",
    description: "Exploring the evolution of transformer models from attention mechanisms to modern LLMs and their applications in real-world systems.",
    date: "Feb 2026",
    readTime: "12 min read",
    tags: ["Deep Learning", "NLP"],
  },
  {
    title: "Deploying ML Models with FastAPI & Docker",
    description: "A practical guide to containerizing machine learning models and serving them as scalable REST APIs using FastAPI and Docker.",
    date: "Jan 2026",
    readTime: "6 min read",
    tags: ["MLOps", "Docker", "FastAPI"],
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// INSIGHTS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Coming soon — thoughts on AI, ML, and software engineering</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.title} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card hover-glow group flex h-full cursor-pointer flex-col rounded-xl border p-6 transition-all"
              >
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="mb-2 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-secondary/20 px-2 py-0.5 font-mono text-xs text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  <BookOpen className="h-3 w-3" />
                  Read Article
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
