import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "ivm39if0";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-05-21";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export type SanityImageValue = {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
} | null;

export type StandardPlan = {
  _id: string;
  planId: string;
  title: string;
  subgroup: "8-10" | "10-12" | "college" | "working";
  price: number;
  features: string[];
  isPopular?: boolean;
};

export type CustomPlan = {
  _id: string;
  planId: string;
  title: string;
  price: number;
  description: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt?: string;
  category?: string;
  readTime?: number;
  coverImage?: SanityImageValue;
};

export type ServiceItem = {
  _id: string;
  title: string;
  subtitle?: string;
  features?: string[];
  order?: number;
  image?: SanityImageValue;
};

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  achievement?: string;
  quote: string;
  order?: number;
  photo?: SanityImageValue;
};

export type SiteSettings = {
  siteTitle?: string;
  logo?: SanityImageValue;
  heroPortrait?: SanityImageValue;
  aboutImage?: SanityImageValue;
};

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle,
  logo,
  heroPortrait,
  aboutImage
}`;

export async function fetchSiteSettings() {
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

export async function fetchStandardPlans() {
  return sanityClient.fetch<StandardPlan[]>(
    `*[_type == "standardPlan"] | order(subgroup asc, title asc){
      _id, planId, title, subgroup, price, features, isPopular
    }`,
  );
}

export async function fetchCustomPlans() {
  return sanityClient.fetch<CustomPlan[]>(
    `*[_type == "customPlan"] | order(price asc){
      _id, planId, title, price, description
    }`,
  );
}

export async function fetchBlogPosts() {
  return sanityClient.fetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      publishedAt,
      category,
      readTime,
      coverImage
    }`,
  );
}

export async function fetchServices() {
  return sanityClient.fetch<ServiceItem[]>(
    `*[_type == "services"] | order(coalesce(order, 999) asc){
      _id, title, subtitle, features, order, image
    }`,
  );
}

export async function fetchTestimonials() {
  return sanityClient.fetch<TestimonialItem[]>(
    `*[_type == "testimonials"] | order(coalesce(order, 999) asc){
      _id, name, role, achievement, quote, order, photo
    }`,
  );
}
