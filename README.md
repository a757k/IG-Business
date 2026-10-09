
# Business IGCSE Revision Website

A responsive starter website for Pearson Edexcel International GCSE Business (4BS1).

## Project files

- `index.html` — website layout and navigation.
- `styles.css` — design and responsive styling.
- `content.js` — starter syllabus topics and practice questions.
- `app.js` — search, filters, quizzes, progress tracking and AI Tutor interface.
- `netlify/functions/ai.js` — server-side AI Tutor endpoint.
- `netlify.toml` — Netlify deployment configuration.

## Progress tracking

Completed topics are saved in localStorage in the current browser on the current device.

Progress may be lost if browser/site data is cleared, private browsing is used, or a different browser or device is used.

## Deploying to Netlify

1. Upload all project files and folders to a GitHub repository.
2. Import the repository into Netlify.
3. Keep the publish directory and functions directory configured as specified in `netlify.toml`.
4. Add `OPENAI_API_KEY` under the site's environment variables.
5. Optionally set `OPENAI_MODEL` to a model available to your account.
6. Trigger a new deployment and test the website.

Do not expose your API key in frontend code.

## Content limitations

This is a starter library, not a verified complete coverage of every point in the Pearson 4BS1 specification.

Expand and cross-check every topic and subtopic against the current official specification before describing the site as comprehensive.

The included questions are original practice questions, not copied past-paper questions or official Pearson mark schemes.

Official qualification page:

https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/business-2017.html
