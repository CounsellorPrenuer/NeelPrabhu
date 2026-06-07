import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  Mail,
} from "lucide-react";
import {
  MotionSection,
  MotionDiv,
  MotionCard,
  MotionStagger,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
} from "@/components/ui/motion";
import { fetchBlogPosts, type BlogPost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import BlogModal from "@/components/ui/blog-modal";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["sanity-blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const openBlogModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeBlogModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background via-background-alt to-background relative overflow-hidden">
        <div className="container-responsive">
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </MotionSection>
    );
  }

  return (
    <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background via-background-alt to-background relative overflow-hidden">
      <div className="container-responsive relative z-10">
        <MotionDiv
          className="max-w-4xl mx-auto text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MotionDiv variants={scaleIn} className="mb-6">
            <Badge className="px-6 py-2 bg-secondary/10 text-secondary border-secondary/20 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Insights
            </Badge>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-6 text-balance">
              Career Insights & Expert Guidance
            </h2>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay updated with practical guides, career tips, and industry
              insights from Neel Prabhu&apos;s 20+ years of experience.
            </p>
          </MotionDiv>
        </MotionDiv>

        {posts.length > 0 ? (
          <MotionStagger stagger={0.15} delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post, index) => {
                const coverUrl = urlFor(post.coverImage, {
                  width: 800,
                  height: 450,
                });
                return (
                  <MotionCard
                    key={post._id}
                    className="glass-card overflow-hidden group interactive-lift"
                    variants={
                      index % 3 === 0
                        ? fadeInLeft
                        : index % 3 === 1
                          ? fadeInUp
                          : fadeInRight
                    }
                    data-testid={`blog-post-${post._id}`}
                  >
                    <div className="h-48 relative overflow-hidden bg-muted">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={post.coverImage?.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 gradient-primary flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white/60" />
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4 text-xs text-muted-foreground">
                        {post.publishedAt && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {post.readTime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} min read</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-fluid-lg font-bold mb-3 text-foreground line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-sm">
                          {post.excerpt}
                        </p>
                      )}
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                        onClick={() => openBlogModal(post)}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </MotionCard>
                );
              })}
            </div>
          </MotionStagger>
        ) : (
          <MotionDiv className="text-center py-12" variants={fadeInUp}>
            <p className="text-muted-foreground">
              No blog posts available at the moment.
            </p>
          </MotionDiv>
        )}

        <MotionDiv className="mt-16" variants={fadeInUp}>
          <div className="glass-card p-10 text-center max-w-3xl mx-auto">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-fluid-2xl font-bold text-foreground mb-4">
              Stay Updated with Expert Insights
            </h3>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="Enter your email address" className="flex-1" />
              <Button type="submit" className="gradient-secondary text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </MotionDiv>
      </div>

      <BlogModal post={selectedPost} isOpen={isModalOpen} onClose={closeBlogModal} />
    </MotionSection>
  );
}
