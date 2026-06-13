"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const categoryColors: Record<string, string> = {
  Go: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PHP: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  DevOps: "bg-green-500/10 text-green-400 border-green-500/20",
  Architecture: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
}

interface BlogContentProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogContent({ posts, allTags }: BlogContentProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    if (tag) setSelectedTags([tag]);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => post.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags, posts]);

  return (
    <>
      <section className="pt-32 pb-16 md:pb-20 bg-navy-900 dark:bg-navy-950">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-4 block">Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Engineering <span className="gradient-text">Knowledge</span></h1>
            <p className="text-[var(--text-secondary)] text-lg">Thoughts on Go, PHP, architecture, and building software that lasts.</p>
          </motion.div>
        </Container>
      </section>

      <section className="section-padding pt-12">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/60 transition-all" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${active ? "bg-gold-500/20 text-gold-400 border-gold-500/40" : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-gold-500/30 hover:text-gold-400"}`}>{tag}</button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-semibold mb-2">No articles found</h3>
              <p className="text-[var(--text-secondary)] text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={`/blog/${post.slug}`}>
                    <article className="glass-card p-6 h-full group cursor-pointer hover:border-gold-500/30 transition-all duration-500">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${categoryColors[post.category] || ""}`}>{post.category}</span>
                        <span className="text-xs text-[var(--text-muted)]">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">{post.tags.map((tag) => (<span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)]">{tag}</span>))}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)]">{post.date}</span>
                        <span className="text-xs text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
                      </div>
                    </article>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
