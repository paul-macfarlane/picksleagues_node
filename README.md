# Picks Leagues Node Backend

## Prerequisites

- Node.js
- npm
- PostgreSQL database (local or remote)

## Setup

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd picksleagues_node
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env` and fill in the required values:

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:3000` by default.

5. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## Project Structure

- `src/` — TypeScript source files
- `.env` — Environment variables (not committed)
- `dist/` — Compiled JavaScript output

## Useful Commands

- `npm run dev` — Start server with hot-reload (nodemon + ts-node)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run compiled server
