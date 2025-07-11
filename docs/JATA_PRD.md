# Product Requirements Document (PRD) for JATA

## 1. Introduction

**Project Name:** JATA (Job Application Tracker and Optimization App)  
**Version:** 1.0  
**Date:** July 10, 2025  
**Purpose:** JATA is a web application with a browser extension designed to streamline the job application process. It empowers job seekers by automating job detail extraction, providing AI-driven resume tailoring, and offering a dashboard with analytics to track applications and identify high-success opportunities. Built with free, open-source tools, JATA operates within a zero-budget constraint, leveraging existing Vercel and Netlify accounts for development and deployment.

**Target Audience:** Job seekers applying to multiple roles across industries, seeking an efficient way to tailor resumes, track applications, and analyze response patterns.

## 2. Project Vision

**Mission:** To simplify and enhance the job application process by automating repetitive tasks and providing data-driven insights, enabling users to focus on high-potential opportunities.

**Key Objectives:**
- Enable one-click job detail extraction and logging via a browser extension.
- Provide AI-powered resume tailoring to match job descriptions, improving ATS compatibility.
- Offer a dashboard with actionable analytics on application success rates by role, industry, or source.
- Build and deploy using free-tier services (Vercel v0 for prototyping, Netlify Bolt for deployment) with no payment card required.

## 3. Features and Functionality

### 3.1 Core Features
- **Browser Extension:**
  - Extracts job details (title, company, description, source URL) from web pages using a point-and-click interface.
  - Logs details to the JATA dashboard via a single click.
  - Supports Chrome, Firefox, and Edge via WebExtensions API.
- **AI Resume Tailoring:**
  - Analyzes uploaded resumes and job descriptions using NLP.
  - Suggests keywords, skills, and section reordering to optimize ATS compatibility.
  - Provides a downloadable tailored resume in PDF format.
- **Application Tracking Dashboard:**
  - Displays applications with metadata (status, date, role, industry, source).
  - Supports filtering, sorting, and fuzzy search by title or company.
  - Allows manual addition and status updates (e.g., Applied, Interviewing, Offer, Rejected).
- **Analytics and Insights:**
  - Visualizes response rates by industry, status breakdown, and application trends over time.
  - Offers actionable suggestions (e.g., "Tech roles have a 20% higher response rate").

### 3.2 Future Features
- **Batch Submission:** Generate tailored resumes for multiple jobs and apply in bulk.
- **Auto-Submission:** Integrate with job board APIs (e.g., LinkedIn, Indeed) to auto-fill and submit applications.
- **Notifications:** Alerts for deadlines or job matches.

## 4. User Stories
- As a job seeker, I want to extract job details from a webpage with one click to save time.
- As a job seeker, I want AI to suggest resume improvements for a job description to improve my ATS score.
- As a job seeker, I want to track my applications in one place and update their status easily.
- As a job seeker, I want analytics to identify which industries or sources yield better responses.

## 5. Technical Requirements

- **Backend:** Node.js with Express.js, deployed as Netlify Functions.
- **Frontend & Extension:** Vite + React with TypeScript.
- **Database:** SQLite with Prisma ORM for zero-cost, file-based storage.
- **AI:** Hugging Face Inference API (free tier) for NLP tasks.
- **Hosting:** Vercel v0 for prototyping, Netlify Bolt (free tier) for deployment.
- **Performance:**
  - Frontend load time: <2 seconds.
  - API response time: <500ms.
  - Scalability: Handle 1,000 concurrent users on free tiers.
- **Security:**
  - HTTPS for all communications.
  - Input sanitization to prevent XSS and injection attacks.
  - GDPR/CCPA compliance for user data.
- **Compatibility:** Chrome, Firefox, Edge, Safari; responsive on mobile, tablet, desktop.

## 6. Design and UI/UX

- **Theme:** Minimalist, Dieter Rams-inspired ("Efficiency Meets Opportunity").
- **Color Palette:**
  - Day: White (#FFFFFF) background, Black (#000000) text, Blue (#3B82F6) accents.
  - Night: Dark Gray (#1A1A1A) background, Light Gray (#E0E0E0) text.
- **Typography:** Inter font, 16px body, 20px headings, 14px secondary text.
- **Animations:** Subtle fades (0.3s) and button hovers (scale 1.05x) using Tailwind CSS classes.
- **Accessibility:** WCAG 2.1 compliance (4.5:1 contrast), ARIA roles, keyboard navigation.

## 7. Development Phases

1. **Phase 1: Setup**
   - Configure Node.js, Vite, SQLite, and Prisma.
   - Set up Vercel v0 for prototyping and Netlify Bolt for deployment.
2. **Phase 2: Backend**
   - Build RESTful APIs and AI integration with Hugging Face.
   - Implement SQLite schema and Prisma migrations.
3. **Phase 3: Frontend & Extension**
   - Develop dashboard with tracking and analytics.
   - Build extension for job extraction and logging.
4. **Phase 4: Testing & Deployment**
   - Conduct unit, integration, and load tests.
   - Deploy to Netlify Bolt using free-tier settings.

## 8. Success Criteria
- **Functional:** All core features (extension, AI tailoring, dashboard, analytics) work seamlessly.
- **Performance:** Meets load time and scalability targets.
- **Usability:** Intuitive interface with a 5-minute learning curve.
- **Deployment:** Successfully deployed on Netlify Bolt’s free tier.

## 9. Deployment Notes
- **Vercel v0:** Use for rapid prototyping of React components. Generated code is copied to the local Vite project.
- **Netlify Bolt:** Deploy frontend and backend (Netlify Functions) using existing Netlify account. Configure via `netlify.toml` for free-tier compatibility.
- **Browser Extension:** Package as a `.zip` and upload to Chrome Web Store and Firefox Add-ons using free developer accounts.