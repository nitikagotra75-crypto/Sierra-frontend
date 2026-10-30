# Sierra Frontend

Web interface for **Sierra**, an AI-assisted backend builder. Users describe the backend they want, view the generated code in an in-browser editor, and run it through the Sierra backend.

Backend repo: https://github.com/nitikagotra75-crypto/Sierra-backend

## Features

- Prompt-based project creation
- Monaco code editor (the VS Code editor) to view and edit generated files
- Multi-page navigation with React Router
- Responsive UI styled with Tailwind CSS
- Talks to the Sierra backend over REST

## Tech Stack

| Purpose | Technology |
|---|---|
| UI | React 19 |
| Build tool | Vite |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Code editor | `@monaco-editor/react` |
| Linting | Oxlint |

## Project Structure

```
Sierra-frontend/
├── public/            # Static assets
├── src/               # Components, pages, API helpers
├── index.html
├── vite.config.js
├── package.json
└── .oxlintrc.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- Sierra backend running (see backend README)

### Install
```bash
git clone https://github.com/nitikagotra75-crypto/Sierra-frontend.git
cd Sierra-frontend
npm install
```

### Environment variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

### Run
```bash
npm run dev
```
Open `http://localhost:5173`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## How the Frontend Connects to the Backend

```
Browser (React, :5173)  --fetch/JSON-->  Express API (:5000)  -->  Claude + MongoDB + Docker
```

1. The user enters a prompt in the UI.
2. The app sends it with `fetch` to `${VITE_API_URL}/api/projects/generate`.
3. The backend returns the generated files, and the UI shows them in Monaco.
4. Edits are saved with `PUT /api/projects/:id`.
5. Clicking Run calls `POST /api/projects/:id/run`, and the UI shows the running app's status and URL.

Example API helper:
```js
const API = import.meta.env.VITE_API_URL;

export async function generateProject(prompt) {
  const res = await fetch(`${API}/api/projects/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}
```

If you hit CORS errors, make sure the backend's `CLIENT_URL` equals `http://localhost:5173`, or add a Vite proxy:
```js
// vite.config.js
export default {
  server: { proxy: { "/api": "http://localhost:5000" } },
};
```

## Deployment

1. Run `npm run build`.
2. Deploy `dist/` to Vercel, Netlify, or any static host.
3. Set `VITE_API_URL` to your deployed backend URL.

## Author

Nitika Gotra - [@nitikagotra75-crypto](https://github.com/nitikagotra75-crypto)
