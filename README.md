# Myndos

Myndos is an AI-powered web platform designed to enhance learning and teaching for both students and teachers. It features exam generation with separate dashboards for students and teachers.

## Project Structure

This repository is a monorepo containing both the backend (Node.js/Express) and frontend (Vue 3 + Vite) applications:

- `backend/` — Node.js, Express, TypeScript API server
- `frontend/` — Vue 3 SPA with Pinia, Vue Router, Tailwind CSS

## Features

- Student and teacher dashboards
- AI-powered exam generation (with OpenAI integration)
- Folder/question management for both students and teachers

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

#### 1. Clone the repository

```sh
git clone <repo-url>
cd Myndos
```

#### 2. Install dependencies

```sh
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following (for OpenAI integration):

```
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

#### 4. Run the backend

```sh
cd backend
npm run dev
# or: npm start
```

#### 5. Run the frontend

```sh
cd frontend
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) and will proxy API requests to the backend.

## Development

- Backend: TypeScript, Express, OpenAI API, file-based storage (JSON)
- Frontend: Vue 3, Vite, Pinia, Vue Router, Tailwind CSS

## Scripts

### Backend

- `npm run dev` — Start backend in development mode (nodemon)
- `npm start` — Start backend

### Frontend

- `npm run dev` — Start frontend dev server
- `npm run build` — Build for production
- `npm run test:unit` — Run unit tests (Vitest)
- `npm run lint` — Lint code
- `npm run format` — Format code

## License

MIT
