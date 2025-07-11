# JATA Browser Extension Implementation Guide

## 1. Overview

**Purpose:** The JATA Browser Extension enables users to extract job details (title, company, description, source URL) from web pages and log them to the JATA dashboard with minimal effort.

**Technology:** WebExtensions API, Vite + React with TypeScript, Tailwind CSS for consistency with the frontend.

## 2. Interface Design (Popup)

- **Layout:** 300x400px single-column form.
- **UI Elements:**
  - Text inputs: Job Title, Company, Description (textarea).
  - Read-only: Source URL (auto-populated).
  - Buttons: "Target" icon per input for selection mode, `[Log to Tracker]` (primary, #3B82F6), `[Tailor Resume]` (secondary).
  - Feedback area: Status messages (e.g., "Select job title...").
- **Design:** Matches frontend (Inter font, blue accents).

## 3. Functionality and Workflow

- **Structure:** Popup (`index.html`, React app), content script (`content.js`), no background script for V1.
- **Workflow:**
  1. User clicks extension icon; popup opens with auto-populated Source URL.
  2. User clicks "Target" icon for a field (e.g., Job Title).
  3. Content script activates selection mode, highlighting elements on hover.
  4. User clicks an element; `innerText` is sent to popup via `chrome.runtime.sendMessage`.
  5. Description supports multi-select (concatenate text, Enter to confirm).
  6. User clicks `[Log to Tracker]`; popup sends `POST /api/applications` with data.
  7. Feedback shows success or error; `[Log to Tracker]` becomes `[View in Dashboard]`.

### Example `manifest.json`
```json
{
  "manifest_version": 3,
  "name": "JATA - Job Application Tracker",
  "version": "1.0",
  "description": "Log job applications directly from any webpage.",
  "permissions": ["activeTab", "scripting", "storage"],
  "action": {
    "default_popup": "index.html"
  },
  "icons": {
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### Example Content Script (`content.js`)
```javascript
let activeField = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startSelection') {
    activeField = message.field;
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick, { once: true });
  }
});

function handleMouseOver(e) {
  document.querySelectorAll('.jata-highlight').forEach(el => el.classList.remove('jata-highlight'));
  e.target.classList.add('jata-highlight');
}

function handleClick(e) {
  e.preventDefault();
  const text = e.target.innerText;
  chrome.runtime.sendMessage({ action: 'dataExtracted', field: activeField, data: text });
  document.querySelectorAll('.jata-highlight').forEach(el => el.classList.remove('jata-highlight'));
  document.removeEventListener('mouseover', handleMouseOver);
  activeField = null;
}
```

## 4. Performance and Optimization

- **On-Demand Injection:** Content script activates only during selection mode.
- **Lightweight UI:** Minimal React bundle with Tailwind CSS.
- **Debouncing:** Debounce `mouseover` events to prevent lag.

## 5. Error Handling

- Disable `[Log to Tracker]` until required fields (Job Title, Company) are filled.
- Display errors for API failures (e.g., "Network error, please try again").
- Store JWT in `chrome.storage.local` for authentication (V2).

## 6. Future Features

- **Auto-Submission:** Integrate job board APIs (e.g., LinkedIn) to auto-fill and submit applications using tailored resumes.
- **Smart Detection:** Pre-fill fields for major job boards using predefined selectors.
- **Multi-Select Description:** Allow selecting multiple elements for description text.

## 7. Deployment Notes

- **Building:** Run `npm run build` with Vite to generate static files.
- **Packaging:** Create a `.zip` with `manifest.json`, built files, and icons.
- **Publishing:** Upload to Chrome Web Store and Firefox Add-ons using free developer accounts.
- **Vercel v0:** Use for prototyping popup UI; copy to local project.
- **Netlify Bolt:** Optionally host a landing page for the extension.