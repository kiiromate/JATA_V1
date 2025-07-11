# JATA Frontend Implementation Guide

## 1. Framework and Libraries

- **Framework:** Vite + React with TypeScript for fast builds and type safety.
- **Styling:** Tailwind CSS for utility-first, lightweight styling.
- **HTTP Client:** Axios for API requests.
- **Routing:** React Router for client-side navigation.
- **Charts:** Recharts for responsive analytics visualizations.
- **File Uploads:** React-Dropzone for drag-and-drop PDF uploads.

## 2. Component Structure

- **Root:** `App.tsx` handles routing and global context.
- **Pages:**
  - `DashboardPage.tsx`: Overview with recent applications and quick actions.
  - `ApplicationsPage.tsx`: List or Kanban view of applications with filters.
  - `ResumeBankPage.tsx`: Manages uploaded resumes and tailoring.
  - `AnalyticsPage.tsx`: Displays charts and insights.
- **Components:**
  - `Header.tsx`: Navigation bar with day/night toggle.
  - `ApplicationCard.tsx`: Displays single application details.
  - `FilterBar.tsx`: Filters by status, industry, source.
  - `UploadForm.tsx`: Drag-and-drop for resumes/job descriptions.
  - `ResumePreview.tsx`: Shows tailored resume with highlighted changes.
  - `AnalyticsChart.tsx`: Recharts-based chart component.
  - `Modal.tsx`: Generic modal for confirmations.

## 3. State Management

- **Approach:** React Context API with `useState` and `useReducer` for global state (applications, user settings).
- **Caching:** Use `@tanstack/react-query` for API data caching (5-minute TTL).

## 4. UI/UX Design

- **Layout:** Sidebar (collapsible on mobile) for navigation, main content for pages, header with actions.
- **Responsive Breakpoints:** Mobile (<640px), Tablet (640-1024px), Desktop (>1024px).
- **Colors:** White (#FFFFFF)/Dark Gray (#1A1A1A) backgrounds, Black (#000000)/Light Gray (#E0E0E0) text, Blue (#3B82F6) accents.
- **Typography:** Inter font, 16px body, 20px headings, 14px secondary.
- **Animations:** Tailwind transitions for fades (0.3s) and hovers (scale 1.05x).

## 5. Features and Components

- **Application Tracker:**
  - Fetches from `GET /api/applications`.
  - Renders `ApplicationCard` components in list or Kanban view.
  - Supports filtering/sorting via `FilterBar`.
- **Resume Upload & Tailoring:**
  - `UploadForm` handles PDF uploads (<5MB), calls `POST /api/tailor`.
  - `ResumePreview` displays suggestions with highlighted keywords.
- **Analytics:**
  - Fetches from `GET /api/analytics`.
  - Renders bar (response rates by industry), pie (status breakdown), and line (trends) charts.

### Example Recharts Component
```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatusChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#3B82F6" />
    </BarChart>
  </ResponsiveContainer>
);
```

## 6. Performance Optimization

- **Lazy Loading:** Use `React.lazy` for `AnalyticsPage` and `ResumeBankPage`.
- **Code Splitting:** Split bundles by route using Vite.
- **Image Optimization:** Use SVGs for icons.
- **Caching:** `@tanstack/react-query` for API responses.

## 7. Accessibility

- Use semantic HTML (`<nav>`, `<main>`).
- Add `aria-label` to interactive elements.
- Ensure keyboard navigation (Tab/Enter).
- Verify WCAG 2.1 contrast with WebAIM.

## 8. Security Best Practices

- Avoid `dangerouslySetInnerHTML`.
- Use HTTPS (Netlify default).
- Sanitize inputs with `sanitize-html`.

## 9. Testing

- **Frameworks:** Jest, React Testing Library.
- **Strategy:** Test components and user flows (e.g., render `ApplicationList` with mock API data).
- **Coverage:** Target 80% for critical paths.
- **CI/CD:** GitHub Actions (free tier).

## 10. Deployment Notes

- **Vercel v0:** Use `v0.dev` to generate React components; copy to local Vite project.
- **Netlify Bolt:**
  - Connect GitHub repository to Netlify.
  - Build command: `npm run build`, publish directory: `dist`.
  - Configure `netlify.toml` for frontend and backend.

### Example `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```