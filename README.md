# Picks Leagues Node Backend

## Prerequisites

- Node.js
- npm
- Docker (for local PostgreSQL)

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

4. **Start the local PostgreSQL database:**

   ```sh
   docker compose up -d
   ```

   This will start a PostgreSQL 17 database on port 5433 with credentials as defined in `docker-compose.yml`.

5. **Run database migrations:**

   ```sh
   npx drizzle-kit push:pg
   ```

   This will apply the latest schema changes to your local database.

6. **Run the development server:**

   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:3000` by default.

7. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## Project Structure

- `src/` — TypeScript source files
- `.env` — Environment variables (not committed)
- `drizzle/` — Drizzle migration files
- `dist/` — Compiled JavaScript output

## Useful Commands

- `npm run dev` — Start server with hot-reload (nodemon + ts-node)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run compiled server
- `npm run db:push` — Push schema to database)

---

## 🟦 Drizzle Studio

You can use [Drizzle Studio](https://github.com/drizzle-team/drizzle-studio) for a visual interface to your database:

```sh
npm run db:studio
```

This will launch a local web UI to explore and manage your database schema and data.
