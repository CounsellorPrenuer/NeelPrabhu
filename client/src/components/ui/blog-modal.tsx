import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!post) return null;

  const coverUrl = urlFor(post.coverImage, { width: 1200, height: 600 });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {coverUrl && (
            <img
              src={coverUrl}
              alt={post.coverImage?.alt || post.title}
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          )}
          <DialogTitle className="text-2xl lg:text-3xl font-bold leading-tight">
            {post.title}
          </DialogTitle>
          <div className="flex items-center space-x-4">
            {post.category && <Badge variant="secondary">{post.category}</Badge>}
            {post.publishedAt && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
              </div>
            )}
          </div>
        </DialogHeader>
        <div className="prose prose-sm max-w-none mt-6">
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {post.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
