# Overview

CareerMentoria is a comprehensive career guidance platform that connects students, professionals, schools, and corporates with expert mentorship and AI-ready career solutions. Built by Neel Prabhu, a certified career counselor with 20+ years of experience, the platform offers psychometric assessments, personalized coaching, workshops, and lifetime access to the Mentoria career discovery platform. The system includes both a public-facing website showcasing services and testimonials, and an admin dashboard for content management and payment tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Authentication**: Context-based auth provider with protected routes

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful endpoints with consistent error handling middleware

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with schema-first approach for type safety
- **Schema Management**: Centralized schema definitions in shared directory with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations

## Authentication and Authorization
- **Strategy**: Session-based authentication with hardcoded admin credentials
- **Password Security**: Scrypt hashing with random salt generation
- **Session Management**: PostgreSQL-backed sessions with secure cookie configuration
- **Route Protection**: Admin-only routes protected by role-based middleware

## Content Management System
- **Dynamic Content**: All website sections (hero, about, services, testimonials, blog, workshops) are database-driven and editable via admin dashboard
- **Content Types**: Services, testimonials, blog posts, workshops, and generic content sections
- **Rich Text**: Support for HTML content in blog posts and descriptions
- **Media Handling**: Image placeholders with plans for asset management

## Payment Integration
- **Provider**: Razorpay integration for Student and Professional pricing plans
- **Order Management**: Complete order lifecycle tracking from creation to completion
- **Payment Flow**: Client-side Razorpay checkout with server-side order verification
- **Admin Tracking**: Payment dashboard for order status monitoring and revenue analytics

# External Dependencies

## Third-Party Services
- **Database**: Neon PostgreSQL serverless database
- **Payment Gateway**: Razorpay for handling payments and order management
- **Email Service**: SendGrid for transactional emails and notifications
- **Career Platform**: Integration with Mentoria career discovery platform (referenced but not implemented)

## Development Tools
- **Deployment**: Replit-optimized with custom Vite plugins for development experience
- **Code Quality**: TypeScript for type safety across frontend, backend, and shared schemas
- **Build System**: Vite for frontend bundling and esbuild for backend compilation
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming

## UI Components and Libraries
- **Component Library**: Comprehensive Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for admin dashboard analytics visualization
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Utilities**: Class Variance Authority and clsx for dynamic styling