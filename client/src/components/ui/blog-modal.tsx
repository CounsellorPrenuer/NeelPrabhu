import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, X } from "lucide-react";
import { BlogPost } from "@shared/schema";

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <DialogTitle className="text-2xl lg:text-3xl font-bold leading-tight">
                {post.title}
              </DialogTitle>
              
              <div className="flex items-center space-x-4 mt-4">
                {post.category && (
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                )}
                
                {post.createdAt && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                )}
                
                {post.readTime && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {post.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </DialogHeader>
        
        <div className="prose prose-lg max-w-none mt-6">
          <div 
            className="text-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br />') 
            }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Share this article:
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const url = window.location.href;
                const text = `Check out this article: ${post.title}`;
                if (navigator.share) {
                  navigator.share({ title: post.title, text, url });
                } else {
                  navigator.clipboard.writeText(`${text} - ${url}`);
                }
              }}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              data-testid="button-share-article"
            >
              Share
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
