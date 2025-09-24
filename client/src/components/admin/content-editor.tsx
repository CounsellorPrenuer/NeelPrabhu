import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Save, Star } from "lucide-react";
import type { Content, Testimonial, BlogPost, Workshop, Inquiry } from "@shared/schema";

interface ContentEditorProps {
  section: string;
}

export default function ContentEditor({ section }: ContentEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("testimonials");

  // Testimonials Management
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    isActive: true
  });

  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);

  const createTestimonialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/testimonials", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Testimonial created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      setTestimonialForm({ name: "", role: "", content: "", rating: 5, isActive: true });
    },
    onError: () => {
      toast({ title: "Failed to create testimonial", variant: "destructive" });
    }
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Testimonial updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      setEditingTestimonial(null);
      setTestimonialForm({ name: "", role: "", content: "", rating: 5, isActive: true });
    },
    onError: () => {
      toast({ title: "Failed to update testimonial", variant: "destructive" });
    }
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Testimonial deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
    },
    onError: () => {
      toast({ title: "Failed to delete testimonial", variant: "destructive" });
    }
  });

  // Blog Posts Management
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    isPublished: true
  });

  const [editingBlog, setEditingBlog] = useState<string | null>(null);

  // Workshops Management
  const { data: workshops = [] } = useQuery<Workshop[]>({
    queryKey: ["/api/admin/workshops"],
  });

  // Inquiries Management
  const { data: inquiries = [] } = useQuery<Inquiry[]>({
    queryKey: ["/api/admin/inquiries"],
  });

  const updateInquiryMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PUT", `/api/admin/inquiries/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Inquiry status updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
    }
  });

  const handleTestimonialSubmit = () => {
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({
        id: editingTestimonial,
        data: testimonialForm
      });
    } else {
      createTestimonialMutation.mutate(testimonialForm);
    }
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setTestimonialForm({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      isActive: testimonial.isActive
    });
    setEditingTestimonial(testimonial.id);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Content Management</h2>
        <p className="text-muted-foreground">Manage all your website content from one place</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials" className="space-y-6">
          {/* Testimonial Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </CardTitle>
              <CardDescription>
                Manage client testimonials and success stories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="Client name"
                    data-testid="input-testimonial-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="Client role or title"
                    data-testid="input-testimonial-role"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea
                  id="content"
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  placeholder="What did the client say?"
                  rows={4}
                  data-testid="textarea-testimonial-content"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select 
                      value={testimonialForm.rating.toString()} 
                      onValueChange={(value) => setTestimonialForm({ ...testimonialForm, rating: parseInt(value) })}
                    >
                      <SelectTrigger className="w-24" data-testid="select-testimonial-rating">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} ⭐
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={testimonialForm.isActive}
                      onCheckedChange={(checked) => setTestimonialForm({ ...testimonialForm, isActive: checked })}
                      data-testid="switch-testimonial-active"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>

                <div className="space-x-2">
                  {editingTestimonial && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setTestimonialForm({ name: "", role: "", content: "", rating: 5, isActive: true });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleTestimonialSubmit}
                    disabled={createTestimonialMutation.isPending || updateTestimonialMutation.isPending}
                    data-testid="button-save-testimonial"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingTestimonial ? "Update" : "Add"} Testimonial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials List */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                    data-testid={`testimonial-item-${index}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <Badge variant="outline">{testimonial.role}</Badge>
                        <div className="flex items-center">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        {!testimonial.isActive && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{testimonial.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTestimonial(testimonial)}
                        data-testid={`button-edit-testimonial-${index}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        data-testid={`button-delete-testimonial-${index}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts Management</CardTitle>
              <CardDescription>
                Create and manage blog posts and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Blog post management interface coming soon...</p>
                <p className="text-sm mt-2">Current posts: {blogPosts.length}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workshops Management</CardTitle>
              <CardDescription>
                Schedule and manage workshops and seminars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Workshop management interface coming soon...</p>
                <p className="text-sm mt-2">Current workshops: {workshops.length}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Inquiries</CardTitle>
              <CardDescription>
                Manage and respond to client inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry, index) => (
                    <div
                      key={inquiry.id}
                      className="p-4 border rounded-lg"
                      data-testid={`inquiry-item-${index}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">
                            {inquiry.firstName} {inquiry.lastName}
                          </h4>
                          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          {inquiry.phone && (
                            <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{inquiry.category}</Badge>
                          <Select
                            value={inquiry.status}
                            onValueChange={(status) => updateInquiryMutation.mutate({ id: inquiry.id, status })}
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
                      <p className="text-muted-foreground">{inquiry.message}</p>
                      {inquiry.service && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Interested in: {inquiry.service}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Received: {new Date(inquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No inquiries yet</p>
                    <p className="text-sm mt-2">Contact form submissions will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
