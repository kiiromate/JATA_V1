# JATA Backend Implementation Guide

## 1. Framework and API Structure

- **Framework:** Node.js with Express.js, chosen for its lightweight nature and compatibility with Netlify Functions.
- **API Design:** RESTful API with JSON responses, deployed as serverless functions on Netlify Bolt.

### Key API Endpoints
- `POST /api/auth/login`: Authenticate user and return a JWT token (future feature for V2).
- `POST /api/auth/register`: Register a new user (future feature for V2).
- `POST /api/applications`: Create a new job application.
- `GET /api/applications`: Retrieve all applications for the user.
- `GET /api/applications/:id`: Retrieve a specific application.
- `PUT /api/applications/:id`: Update an application’s status or details.
- `DELETE /api/applications/:id`: Delete an application.
- `POST /api/tailor`: Analyze resume and job description, return tailoring suggestions.
- `GET /api/analytics`: Return aggregated analytics data (e.g., response rates by industry).

## 2. Database Schema

- **Database:** SQLite, a file-based database requiring no separate hosting, ideal for zero-budget constraints.
- **ORM:** Prisma, providing type safety and simplified migrations.

### Prisma Schema (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Application {
  id          Int      @id @default(autoincrement())
  jobTitle    String
  company     String
  description String?
  sourceUrl   String   @unique
  status      String   @default("Applied") // e.g., Applied, Interviewing, Offer, Rejected
  industry    String?
  dateApplied DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Note:** V1 is single-tenant; authentication will be added in V2.

## 3. AI Integration

- **Service:** Hugging Face Inference API (free tier) for NLP tasks like keyword extraction and semantic matching.
- **Workflow:**
  - Receive resume and job description text via `POST /api/tailor`.
  - Send text to Hugging Face model (e.g., `ml6team/keyphrase-extraction-kbir-inspec`) for keyword extraction.
  - Return structured JSON with suggested keywords and match score.

### Example AI Service Call
```javascript
const axios = require('axios');

async function getKeywords(text) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/ml6team/keyphrase-extraction-kbir-inspec',
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error('AI processing failed: ' + error.message);
  }
}
```

## 4. Security Measures

- **Environment Variables:** Store `HUGGING_FACE_TOKEN` in `.env` locally and Netlify environment settings.
- **Input Validation:** Use `express-validator` to sanitize inputs and prevent injection attacks.
- **CORS:** Restrict to frontend’s Netlify URL using `cors` middleware.
- **HTTPS:** Enforced by Netlify’s free tier.

## 5. Performance Optimizations

- Use stateless endpoints for Netlify Functions compatibility.
- Optimize Prisma queries (e.g., select only needed fields for `GET /api/analytics`).
- Cache frequent queries in memory (e.g., using `node-cache`) for faster responses.

## 6. Error Handling

- **Global Middleware:** Implement Express middleware to catch errors and return JSON responses (e.g., `{ error: "Invalid input", status: 400 }`).
- **AI Fallback:** If Hugging Face API fails, return a generic error and suggest manual resume editing.
- **Logging:** Use `winston` for logging errors to console (Netlify logs are free).

## 7. Scalability Strategies

- Leverage Netlify Functions’ automatic scaling within free-tier limits.
- Optimize SQLite for read-heavy workloads; consider sharding for V2 if needed.

## 8. Testing Approaches

- **Frameworks:** Jest for unit tests, Supertest for API integration tests.
- **Strategy:** Test endpoints and AI logic, aiming for 80% coverage.
- **Example Test:** Verify `POST /api/applications` saves data correctly.
- **CI/CD:** Use GitHub Actions (free tier) for automated testing.

## 9. Deployment Notes

- **Vercel v0:** Not used for backend; reserved for frontend prototyping.
- **Netlify Bolt:**
  - Place backend in `netlify/functions/api.js`, using `serverless-http` to wrap Express.
  - Configure via `netlify.toml` (see frontend document for shared config).
  - Set environment variables in Netlify UI for `HUGGING_FACE_TOKEN`.