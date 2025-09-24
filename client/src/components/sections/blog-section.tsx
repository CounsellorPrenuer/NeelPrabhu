import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogModal from "@/components/ui/blog-modal";
import { ArrowRight, Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: blogPosts = [], isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Fallback blog posts for demonstration
  const fallbackPosts: BlogPost[] = [
    {
      id: "1",
      title: "How to Choose the Right Stream in Class 10",
      excerpt: "A comprehensive guide to help students make informed decisions about their academic streams based on interests, aptitude, and career prospects.",
      content: `
        <h2>Understanding Your Options</h2>
        <p>Choosing the right stream in Class 10 is one of the most crucial decisions that will shape your academic and professional future. This comprehensive guide will help you make an informed choice.</p>
        
        <h3>The Three Main Streams</h3>
        <ul>
          <li><strong>Science Stream:</strong> Physics, Chemistry, Mathematics/Biology</li>
          <li><strong>Commerce Stream:</strong> Accountancy, Business Studies, Economics</li>
          <li><strong>Arts/Humanities Stream:</strong> History, Geography, Political Science, Psychology</li>
        </ul>

        <h3>Factors to Consider</h3>
        <h4>1. Personal Interests and Aptitude</h4>
        <p>Reflect on subjects you enjoy and perform well in. Your natural inclinations often indicate your strengths.</p>
        
        <h4>2. Career Goals</h4>
        <p>Consider the career paths that excite you and research the educational requirements for those fields.</p>
        
        <h4>3. Future Opportunities</h4>
        <p>Look at the job market trends and emerging career opportunities in different fields.</p>

        <h3>Making the Final Decision</h3>
        <p>Remember that your stream choice is not permanent. Many successful professionals have changed their career paths later. The key is to choose based on your current interests and keep yourself open to learning and growth.</p>
      `,
      category: "Career Guidance",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPublished: true,
      createdAt: new Date("2025-03-10"),
      updatedAt: new Date("2025-03-10")
    },
    {
      id: "2",
      title: "AI & Careers – What Students & Professionals Must Know",
      excerpt: "Understanding how artificial intelligence is reshaping the job market and what skills you need to stay relevant in the AI-driven economy.",
      content: `
        <h2>The Current AI Landscape</h2>
        <p>AI is no longer a futuristic concept—it's here and transforming industries across the board. From healthcare to finance, education to entertainment, AI is changing how work gets done.</p>
        
        <h3>Jobs at Risk vs. Jobs Enhanced</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
          <div style="background: #fee2e2; padding: 1rem; border-radius: 0.5rem;">
            <h4>Jobs at Higher Risk</h4>
            <ul>
              <li>Routine data entry</li>
              <li>Basic customer service</li>
              <li>Simple manufacturing tasks</li>
              <li>Basic financial analysis</li>
            </ul>
          </div>
          <div style="background: #dcfce7; padding: 1rem; border-radius: 0.5rem;">
            <h4>Jobs Enhanced by AI</h4>
            <ul>
              <li>Creative problem solving</li>
              <li>Complex decision making</li>
              <li>Human interaction roles</li>
              <li>Strategic planning</li>
            </ul>
          </div>
        </div>
        
        <h3>Essential AI-Era Skills</h3>
        <ul>
          <li><strong>Digital Literacy:</strong> Understanding how AI tools work and how to use them effectively</li>
          <li><strong>Critical Thinking:</strong> Ability to evaluate AI-generated content and make informed decisions</li>
          <li><strong>Creativity and Innovation:</strong> Skills that complement AI capabilities</li>
          <li><strong>Emotional Intelligence:</strong> Human-centric skills that AI cannot replicate</li>
          <li><strong>Continuous Learning:</strong> Adaptability to keep up with rapid technological changes</li>
        </ul>
      `,
      category: "Future Trends",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPublished: true,
      createdAt: new Date("2025-03-08"),
      updatedAt: new Date("2025-03-08")
    },
    {
      id: "3",
      title: "Study Abroad vs. Indian Universities – Making the Right Choice",
      excerpt: "Weighing the pros and cons of international education versus domestic options, including costs, career prospects, and cultural considerations.",
      content: `
        <h2>The Great Education Dilemma</h2>
        <p>One of the biggest decisions students face after Class 12 is whether to pursue higher education abroad or stay in India. This choice can significantly impact your career trajectory, personal growth, and financial future.</p>
        
        <h3>Advantages of Studying Abroad</h3>
        <ul>
          <li><strong>Global Exposure:</strong> Experience different cultures and perspectives</li>
          <li><strong>Quality Education:</strong> Access to world-class universities and research facilities</li>
          <li><strong>Career Opportunities:</strong> Better job prospects in international markets</li>
          <li><strong>Personal Growth:</strong> Independence and life skills development</li>
        </ul>

        <h3>Benefits of Indian Universities</h3>
        <ul>
          <li><strong>Cost-Effective:</strong> Significantly lower tuition and living costs</li>
          <li><strong>Cultural Familiarity:</strong> No culture shock or language barriers</li>
          <li><strong>Growing Opportunities:</strong> India's expanding economy offers great career prospects</li>
          <li><strong>Family Support:</strong> Proximity to family and support systems</li>
        </ul>

        <h3>Making the Decision</h3>
        <p>Consider your financial situation, career goals, family circumstances, and personal preferences. Both paths can lead to successful careers if chosen thoughtfully.</p>
      `,
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPublished: true,
      createdAt: new Date("2025-03-05"),
      updatedAt: new Date("2025-03-05")
    }
  ];

  const displayPosts = blogPosts.length > 0 ? blogPosts : fallbackPosts;

  const categories = ["all", ...Array.from(new Set(displayPosts.map(post => post.category)))];

  const filteredPosts = displayPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (post: BlogPost) => {
    setSelectedBlog(post);
  };

  if (error) {
    console.error("Error loading blog posts:", error);
  }

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Blog & Resources</h2>
          <p className="text-xl text-muted-foreground">
            Stay updated with practical guides, tips, and career insights from Neel Prabhu and industry experts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
                data-testid={`button-category-${category}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading articles...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card key={post.id} className="overflow-hidden card-hover" data-testid={`blog-post-${index}`}>
                <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl">📝</div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Button
                    variant="ghost"
                    onClick={() => handleReadMore(post)}
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    data-testid={`button-read-more-${index}`}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">Subscribe to our newsletter for the latest career insights, tips, and opportunities.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button 
              className="bg-primary hover:bg-primary/90"
              data-testid="button-newsletter-subscribe"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal
          isOpen={!!selectedBlog}
          onClose={() => setSelectedBlog(null)}
          post={selectedBlog}
        />
      )}
    </section>
  );
}
