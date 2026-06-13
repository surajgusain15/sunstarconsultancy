import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
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

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Insights"
          title={<>Engineering <span className="gradient-text">Knowledge</span></>}
          subtitle="Thoughts on Go, PHP, architecture, and building software that lasts."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <AnimatedDiv key={post.slug} delay={i * 0.1} y={30}>
              <a href={`/blog/${post.slug}`}>
                <article className="glass-card p-6 h-full group cursor-pointer hover:border-gold-500/30 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${categoryColors[post.category] || ""}`}>{post.category}</span>
                    <span className="text-xs text-[var(--text-muted)]">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">{post.date}</span>
                    <span className="text-xs text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
                  </div>
                </article>
              </a>
            </AnimatedDiv>
          ))}
        </div>
        <AnimatedDiv y={0} className="text-center mt-10">
          <a href="/blog" className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors">
            View all articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimatedDiv>
      </Container>
    </section>
  );
}
