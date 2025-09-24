import { 
  users, 
  contentSections, 
  services, 
  testimonials, 
  blogPosts, 
  workshops, 
  contactInquiries, 
  paymentOrders,
  type User, 
  type InsertUser,
  type ContentSection,
  type InsertContentSection,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial,
  type BlogPost,
  type InsertBlogPost,
  type Workshop,
  type InsertWorkshop,
  type ContactInquiry,
  type InsertContactInquiry,
  type PaymentOrder,
  type InsertPaymentOrder
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import session, { SessionStore } from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Content methods
  getContentSections(): Promise<ContentSection[]>;
  getContentSection(section: string): Promise<ContentSection | undefined>;
  createContentSection(content: InsertContentSection): Promise<ContentSection>;
  updateContentSection(id: string, content: Partial<InsertContentSection>): Promise<ContentSection>;
  deleteContentSection(id: string): Promise<void>;

  // Service methods
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;

  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Workshop methods
  getWorkshops(): Promise<Workshop[]>;
  getActiveWorkshops(): Promise<Workshop[]>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshop(id: string, workshop: Partial<InsertWorkshop>): Promise<Workshop>;
  deleteWorkshop(id: string): Promise<void>;

  // Contact inquiry methods
  getContactInquiries(): Promise<ContactInquiry[]>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateContactInquiry(id: string, inquiry: Partial<ContactInquiry>): Promise<ContactInquiry>;

  // Payment methods
  getPaymentOrders(): Promise<PaymentOrder[]>;
  getPaymentOrder(id: string): Promise<PaymentOrder | undefined>;
  getPaymentOrderByRazorpayId(razorpayOrderId: string): Promise<PaymentOrder | undefined>;
  createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder>;
  updatePaymentOrder(id: string, order: Partial<PaymentOrder>): Promise<PaymentOrder>;

  sessionStore: SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'session'
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Content methods
  async getContentSections(): Promise<ContentSection[]> {
    return await db.select().from(contentSections).orderBy(contentSections.section);
  }

  async getContentSection(section: string): Promise<ContentSection | undefined> {
    const [content] = await db.select().from(contentSections).where(eq(contentSections.section, section));
    return content || undefined;
  }

  async createContentSection(content: InsertContentSection): Promise<ContentSection> {
    const [newContent] = await db.insert(contentSections).values(content).returning();
    return newContent;
  }

  async updateContentSection(id: string, content: Partial<InsertContentSection>): Promise<ContentSection> {
    const [updated] = await db.update(contentSections)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(contentSections.id, id))
      .returning();
    return updated;
  }

  async deleteContentSection(id: string): Promise<void> {
    await db.delete(contentSections).where(eq(contentSections.id, id));
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.name);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true)).orderBy(services.name);
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const [updated] = await db.update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
    return updated;
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updated] = await db.update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updated] = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Workshop methods
  async getWorkshops(): Promise<Workshop[]> {
    return await db.select().from(workshops).orderBy(workshops.date);
  }

  async getActiveWorkshops(): Promise<Workshop[]> {
    return await db.select().from(workshops)
      .where(eq(workshops.isActive, true))
      .orderBy(workshops.date);
  }

  async createWorkshop(workshop: InsertWorkshop): Promise<Workshop> {
    const [newWorkshop] = await db.insert(workshops).values(workshop).returning();
    return newWorkshop;
  }

  async updateWorkshop(id: string, workshop: Partial<InsertWorkshop>): Promise<Workshop> {
    const [updated] = await db.update(workshops)
      .set(workshop)
      .where(eq(workshops.id, id))
      .returning();
    return updated;
  }

  async deleteWorkshop(id: string): Promise<void> {
    await db.delete(workshops).where(eq(workshops.id, id));
  }

  // Contact inquiry methods
  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [newInquiry] = await db.insert(contactInquiries).values(inquiry).returning();
    return newInquiry;
  }

  async updateContactInquiry(id: string, inquiry: Partial<ContactInquiry>): Promise<ContactInquiry> {
    const [updated] = await db.update(contactInquiries)
      .set(inquiry)
      .where(eq(contactInquiries.id, id))
      .returning();
    return updated;
  }

  // Payment methods
  async getPaymentOrders(): Promise<PaymentOrder[]> {
    return await db.select().from(paymentOrders).orderBy(desc(paymentOrders.createdAt));
  }

  async getPaymentOrder(id: string): Promise<PaymentOrder | undefined> {
    const [order] = await db.select().from(paymentOrders).where(eq(paymentOrders.id, id));
    return order || undefined;
  }

  async getPaymentOrderByRazorpayId(razorpayOrderId: string): Promise<PaymentOrder | undefined> {
    const [order] = await db.select().from(paymentOrders).where(eq(paymentOrders.razorpayOrderId, razorpayOrderId));
    return order || undefined;
  }

  async createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder> {
    const [newOrder] = await db.insert(paymentOrders).values(order).returning();
    return newOrder;
  }

  async updatePaymentOrder(id: string, order: Partial<PaymentOrder>): Promise<PaymentOrder> {
    const [updated] = await db.update(paymentOrders)
      .set(order)
      .where(eq(paymentOrders.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
