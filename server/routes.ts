import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import {
  insertContentSectionSchema,
  insertServiceSchema,
  insertTestimonialSchema,
  insertBlogPostSchema,
  insertWorkshopSchema,
  insertContactInquirySchema,
  insertPaymentOrderSchema
} from "@shared/schema";
import { ZodError } from "zod";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret",
});

// Middleware to check if user is authenticated admin
function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated() || req.user?.role !== 'admin') {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Content Section routes
  app.get("/api/content-sections", async (req, res) => {
    try {
      const sections = await storage.getContentSections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content sections" });
    }
  });

  app.get("/api/content-sections/:section", async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.section);
      if (!section) {
        return res.status(404).json({ message: "Content section not found" });
      }
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content section" });
    }
  });

  app.post("/api/content-sections", requireAuth, async (req, res) => {
    try {
      const validatedData = insertContentSectionSchema.parse(req.body);
      const section = await storage.createContentSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create content section" });
    }
  });

  app.put("/api/content-sections/:id", requireAuth, async (req, res) => {
    try {
      const section = await storage.updateContentSection(req.params.id, req.body);
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: "Failed to update content section" });
    }
  });

  app.delete("/api/content-sections/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteContentSection(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete content section" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = req.query.active === 'true' 
        ? await storage.getActiveServices()
        : await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post("/api/services", requireAuth, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = req.query.active === 'true'
        ? await storage.getActiveTestimonials()
        : await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.omit({ id: true }).parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Blog routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = req.query.published === 'true'
        ? await storage.getPublishedBlogPosts()
        : await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put("/api/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.omit({ id: true }).parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Workshop routes
  app.get("/api/workshops", async (req, res) => {
    try {
      const workshops = req.query.active === 'true'
        ? await storage.getActiveWorkshops()
        : await storage.getWorkshops();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops" });
    }
  });

  app.post("/api/workshops", requireAuth, async (req, res) => {
    try {
      const validatedData = insertWorkshopSchema.parse(req.body);
      const workshop = await storage.createWorkshop(validatedData);
      res.status(201).json(workshop);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create workshop" });
    }
  });

  app.put("/api/workshops/:id", requireAuth, async (req, res) => {
    try {
      const workshop = await storage.updateWorkshop(req.params.id, req.body);
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to update workshop" });
    }
  });

  app.delete("/api/workshops/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteWorkshop(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete workshop" });
    }
  });

  // Contact inquiry routes
  app.get("/api/contact-inquiries", requireAuth, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact inquiries" });
    }
  });

  app.post("/api/contact-inquiries", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact inquiry" });
    }
  });

  app.put("/api/contact-inquiries/:id", requireAuth, async (req, res) => {
    try {
      const inquiry = await storage.updateContactInquiry(req.params.id, req.body);
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact inquiry" });
    }
  });

  // Payment routes
  app.get("/api/payment-orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getPaymentOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment orders" });
    }
  });

  app.post("/api/create-order", async (req, res) => {
    try {
      const { serviceId, customerEmail, customerName, customerPhone } = req.body;
      
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      const options = {
        amount: (service.price || 0) * 100, // amount in paisa
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      const paymentOrder = await storage.createPaymentOrder({
        razorpayOrderId: razorpayOrder.id,
        amount: service.price || 0,
        currency: "INR",
        serviceId,
        customerEmail,
        customerName,
        customerPhone,
        receipt: options.receipt,
      });

      res.json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
        paymentOrderId: paymentOrder.id,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const crypto = require('crypto');
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest('hex');

      if (generated_signature === razorpay_signature) {
        const paymentOrder = await storage.getPaymentOrderByRazorpayId(razorpay_order_id);
        if (paymentOrder) {
          await storage.updatePaymentOrder(paymentOrder.id, {
            razorpayPaymentId: razorpay_payment_id,
            status: "paid",
            paidAt: new Date(),
          });
        }

        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
