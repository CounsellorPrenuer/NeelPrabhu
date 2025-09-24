import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Clock, BookOpen, Search, TrendingUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection, MotionDiv, MotionCard, MotionStagger, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/components/ui/motion";
import { BlogPost } from "@shared/schema";
import BlogModal from "@/components/ui/blog-modal";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog-posts?published=true");
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
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
          <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={fadeInUp}>
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </MotionDiv>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </MotionSection>
    );
  }

  return (
    <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background via-background-alt to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 right-16 w-40 h-40 gradient-primary rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float"></div>
      <div className="absolute bottom-16 left-16 w-52 h-52 gradient-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-responsive relative z-10">
        <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <MotionDiv variants={scaleIn} className="mb-6">
            <Badge className="px-6 py-2 bg-secondary/10 text-secondary border-secondary/20 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Insights
            </Badge>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-6 text-balance" data-testid="blog-main-heading">
              Career Insights
              <br />
              & Expert Guidance
            </h2>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay updated with practical guides, career tips, and industry insights from 
              Neel Prabhu's 20+ years of experience in career counseling and guidance.
            </p>
          </MotionDiv>
        </MotionDiv>

        {posts.length > 0 ? (
          <MotionStagger stagger={0.15} delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post, index) => (
                <MotionCard 
                  key={post.id} 
                  className="glass-card overflow-hidden group interactive-lift"
                  variants={index % 3 === 0 ? fadeInLeft : index % 3 === 1 ? fadeInUp : fadeInRight}
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  data-testid={`blog-post-${post.id}`}
                >
                  {/* Blog Image */}
                  <div className="h-48 gradient-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-6xl opacity-60">📖</div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      {post.category && (
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-3 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}</span>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-fluid-lg font-bold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-sm">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform"
                      onClick={() => openBlogModal(post)}
                      data-testid={`button-read-more-${post.id}`}
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </MotionCard>
              ))}
            </div>
          </MotionStagger>
        ) : (
          <MotionDiv 
            className="text-center py-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
          >
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No blog posts available at the moment.</p>
            </div>
          </MotionDiv>
        )}

        {/* Newsletter Signup */}
        <MotionDiv 
          className="mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="glass-card p-10 text-center max-w-3xl mx-auto relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-4 left-4 w-20 h-20 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-fluid-2xl font-bold text-foreground mb-4">Stay Updated with Expert Insights</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our newsletter for the latest career insights, industry trends, 
                and actionable guidance delivered directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-12 rounded-xl border-primary/20 focus:border-primary"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  className="gradient-secondary text-white hover:opacity-90 h-12 px-8 rounded-xl interactive-scale"
                  data-testid="button-newsletter-subscribe"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-4">
                Join 5,000+ professionals getting weekly career insights • Unsubscribe anytime
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeBlogModal}
      />
    </MotionSection>
  );
}