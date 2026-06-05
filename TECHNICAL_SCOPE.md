# Relski: Technical Scope & System Architecture

## 1. Project Philosophy
Relski is a high-end "Career Operating System." The goal is to provide a world-class UI/UX that feels unique, secure, and intelligent. 

- **Security First:** Zero tolerance for exposed secrets. All sensitive logic stays server-side.
- **Order over Chaos:** Clean, modular code synced to GitHub from Day 1.
- **Product Depth:** Using AI not as a gimmick, but as a core orchestration engine for career growth.

---

## 2. Technology Stack
- **Framework:** Next.js 14+ (App Router) for high-performance SSR and secure API routes.
- **Database & Auth:** Supabase (Postgres) with Row Level Security (RLS) and Email Magic Links.
- **AI Orchestration:** Vercel AI SDK + Anthropic Claude (Server-side proxy).
- **Styling:** Tailwind CSS + Framer Motion (for high-end micro-interactions).
- **Typography:** Modern Geometric (e.g., *Satoshi* or *Plus Jakarta Sans*).
- **Theme:** System-preference (Dark/Light) with custom Slate/Deep Blue and Indigo accents.

---

## 3. Product Features & Modules

### A. Conversational Onboarding (The Hook)
- **Interface:** Dynamic AI-Chat interface that replaces traditional forms.
- **Logic:** Step-by-step profile building stored in temporary state and committed to DB on "Sign Up."
- **Freemium Moment:** AI generates a "Career Season" summary or "Reality Check" insight immediately after onboarding to drive conversion.

### B. The User Workspace
- **Reality Check & Journey Map:** Visual, data-backed career roadmaps.
- **The Sage (AI Coach):** Secure, context-aware chat proxying through the backend.
- **Career Logging:** A structured system to track wins, tasks, and reflections.
- **Opportunities Feed:** External API integrations (Adzuna/NewsAPI) filtered by user profile.

### C. Admin Dashboard (Internal)
- **User Management:** Overview of user growth, status, and subscription tiers.
- **System Monitoring:** Oversight of AI token usage/costs and API health.
- **Content Management:** Ability to manage referral codes, feedback, and global settings.

---

## 4. Security & Data Protection
- **Secret Management:** ZERO API keys in the frontend. All keys (Anthropic, Paystack, Supabase Service Role) managed via Vercel/Supabase Environment Variables.
- **Data Privacy:** NDPR/GDPR compliance logic. Encryption at rest and bulletproof RLS policies.
- **Integrity:** Server-side validation for all critical inputs (onboarding data, payment webhooks).

---

## 5. Billing & Integration
- **Model:** 3-Tier (Free, Standard, Pro).
- **Gatekeeper:** Backend check on all `/api` routes to enforce plan limits (e.g., Sage chat counts).
- **Providers:** Modular adapter architecture ready for **Paystack** (primary) and **Stripe** (future expansion).

---

## 6. Development Workflow (GitHub & DevOps)
- **Source:** Hosted on `github.com/Sodeeq-Azeez/.
- **Branching Strategy:**
  - `main`: Production-ready code only.
  - `dev`: Staging/Integration branch for testing.
- **Deployment:** 
  - Hosted on Vercel. 
  - **Manual Deployment:** Auto-deploy disabled. Merges to `main` require explicit confirmation and smoke testing.
- **Quality Assurance:** No library or code added without a "Necessary, Secure, Scalable" review.
