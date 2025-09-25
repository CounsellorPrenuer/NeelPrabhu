import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Service,
  Testimonial,
  BlogPost,
  Workshop,
  ContactInquiry,
  InsertService,
  InsertTestimonial,
  InsertBlogPost,
  InsertWorkshop
} from "@shared/schema";

interface ContentManagerProps {
  section: "services" | "testimonials" | "blog" | "workshops" | "contact";
}

export default function ContentManager({ section }: ContentManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getQueryKey = () => {
    switch (section) {
      case "services": return "/api/services";
      case "testimonials": return "/api/testimonials";
      case "blog": return "/api/blog-posts";
      case "workshops": return "/api/workshops";
      case "contact": return "/api/contact-inquiries";
      default: throw new Error(`Unknown section: ${section}`);
    }
  };

  const { data: items = [], isLoading } = useQuery({
    queryKey: [getQueryKey()],
    queryFn: async () => {
      const response = await fetch(getQueryKey());
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", getQueryKey(), data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getQueryKey()] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: "Item created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create item", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `${getQueryKey()}/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getQueryKey()] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: "Item updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update item", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `${getQueryKey()}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getQueryKey()] });
      toast({ title: "Item deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete item", description: error.message, variant: "destructive" });
    },
  });

  // FIX: Moved the mutation hook to the top level of the component.
  const updateInquiryStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PUT", `/api/contact-inquiries/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getQueryKey()] });
      toast({ title: "Status updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
    },
  });

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openDialog = (item?: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
    if (item) {
      Object.keys(item).forEach(key => {
        setValue(key, item[key]);
      });
    } else {
      reset();
    }
  };

  const renderFormFields = () => {
    switch (section) {
      case "services":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="mentorship">Mentorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea
                id="features"
                placeholder="Feature 1, Feature 2, Feature 3"
                {...register("features", {
                  setValueAs: (value) => {
                    // Handle both string and array values safely
                    if (!value) return [];
                    if (Array.isArray(value)) return value;
                    if (typeof value === 'string') return value.split(',').map((f: string) => f.trim());
                    return [];
                  }
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch onCheckedChange={(checked) => setValue("isActive", checked)} />
              <Label>Active</Label>
            </div>
          </>
        );

      case "testimonials":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...register("role")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Testimonial Content</Label>
              <Textarea id="content" {...register("content", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select onValueChange={(value) => setValue("rating", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch onCheckedChange={(checked) => setValue("isActive", checked)} />
              <Label>Active</Label>
            </div>
          </>
        );

      case "blog":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" {...register("excerpt")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={8} {...register("content", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input id="readTime" placeholder="5 min read" {...register("readTime")} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch onCheckedChange={(checked) => setValue("isPublished", checked)} />
              <Label>Published</Label>
            </div>
          </>
        );

      case "workshops":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title</Label>
              <Input id="title" {...register("title", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schools">Schools</SelectItem>
                  <SelectItem value="parents">Parents</SelectItem>
                  <SelectItem value="corporates">Corporates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input 
                id="date" 
                type="datetime-local" 
                {...register("date", {
                  setValueAs: (value) => value ? new Date(value) : null
                })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationUrl">Registration URL</Label>
              <Input id="registrationUrl" type="url" {...register("registrationUrl")} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch onCheckedChange={(checked) => setValue("isActive", checked)} />
              <Label>Active</Label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderContactInquiryCard = (inquiry: ContactInquiry) => {
    const updateInquiryStatus = useMutation({
      mutationFn: async ({ id, status }: { id: string; status: string }) => {
        const response = await apiRequest("PUT", `/api/contact-inquiries/${id}`, { status });
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [getQueryKey()] });
        toast({ title: "Status updated successfully" });
      },
      onError: (error: Error) => {
        toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
      },
    });

    return (
      <Card key={inquiry.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">
                {inquiry.firstName} {inquiry.lastName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{inquiry.email}</p>
              {inquiry.phone && (
                <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {inquiry.category && (
                <Badge variant="secondary">{inquiry.category}</Badge>
              )}
              <Select
                value={inquiry.status}
                onValueChange={(status) => updateInquiryStatus.mutate({ id: inquiry.id, status })}
                data-testid={`select-status-${inquiry.id}`}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{inquiry.message}</p>
          {inquiry.service && (
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Interested in:</strong> {inquiry.service}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Received: {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'Unknown'}
          </p>
        </CardContent>
      </Card>
    );
  };

  const renderItemCard = (item: any) => {
    // Special handling for contact inquiries
    if (section === "contact") {
      return renderContactInquiryCard(item);
    }

    const isActive = item.isActive || item.isPublished;

    return (
      <Card key={item.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{item.name || item.title}</CardTitle>
              {item.category && <Badge variant="secondary" className="mt-1">{item.category}</Badge>}
              {item.role && <p className="text-sm text-muted-foreground mt-1">{item.role}</p>}
            </div>
            <div className="flex items-center space-x-2">
              {isActive ? (
                <Eye className="w-4 h-4 text-green-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              {item.price && (
                <Badge variant="outline">₹{item.price}</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {item.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
          )}
          {item.content && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.content}</p>
          )}
          {item.excerpt && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.excerpt}</p>
          )}

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => openDialog(item)}
              data-testid={`button-edit-${item.id}`}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteMutation.mutate(item.id)}
              data-testid={`button-delete-${item.id}`}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold capitalize">
          {section === "contact" ? "Contact Inquiries" : `${section} Management`}
        </h3>
        {section !== "contact" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()} data-testid={`button-add-${section}`}>
                <Plus className="w-4 h-4 mr-2" />
                Add {section.slice(0, -1)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit" : "Create"} {section.slice(0, -1)}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {renderFormFields()}
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid={`button-save-${section}`}
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(renderItemCard)}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {section === "contact"
              ? "No contact inquiries yet. Customer inquiries from the contact form will appear here."
              : `No ${section} found. Create your first one!`}
          </p>
        </div>
      )}
    </div>
  );
}