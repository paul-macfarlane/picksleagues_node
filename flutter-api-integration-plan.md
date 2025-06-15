# Picks Leagues — Flutter Mobile App Plan (API-Focused)

This document outlines the implementation and API integration plan for **Picks Leagues**, a Flutter mobile app where users compete to make NFL picks against the spread or straight up.

## ✳️ Authentication

- **Providers**: Google and Discord (OAuth2 with PKCE)
- **Authentication Flow**:
  1. Flutter uses `flutter_appauth` or `oauth2_client` to initiate login.
  2. Backend exchanges code for tokens and returns JWT.
  3. Mobile app stores JWT securely.
- **Endpoints**:
  - `POST /auth/oauth/token` — exchange code & codeVerifier for JWT
  - `GET /me` — get current user info

## 👤 Account Setup & Profile

- After first sign-in, users enter:
  - Username (8–20 chars)
  - Profile Pic URL (optional)
  - First Name
  - Last Name
  - Time Zone

- **Endpoints**:
  - `POST /users/setup` — submit first-time user info
  - `PATCH /users/me` — update profile
  - `GET /users/me` — fetch profile

## 🏠 Home

- Lists:
  - Picks leagues the user is in
  - Invitations to join leagues
- Actions:
  - Navigate to Create League / Join League

- **Endpoints**:
  - `GET /users/me/leagues`
  - `GET /invites/pending`

## 🆕 Create League

Fields:
- Name (max 32 chars)
- Logo URL (optional)
- Sports League (NFL only)
- Season (current/next)
- Start/End week
- Pick type: ATS or SU
- Picks per week (1–16)
- Visibility: Public / Private
- Max members (1–20)

- **Endpoints**:
  - `POST /leagues`

## 🔍 Join League

- Filterable list of leagues
- Can filter by:
  - League name
  - Sports league & season
  - Start/End week
  - Pick type
  - Picks per week
  - League size

- **Endpoints**:
  - `GET /leagues?filters...`
  - `POST /leagues/:leagueId/join`

## 📺 League Tabs

Each league screen includes:

### 👥 League Members

- View list of members
- Role-based actions (edit role, invite/remove users)
- Invite via deep link or search

- **Endpoints**:
  - `GET /leagues/:id/members`
  - `PATCH /leagues/:id/members/:userId/role`
  - `DELETE /leagues/:id/members/:userId`
  - `POST /leagues/:id/invites`

### 🏆 Standings

- View by rank, points, wins, losses, pushes
- Toggle: current, past, upcoming season

- **Endpoints**:
  - `GET /leagues/:id/standings`

### ✅ My Picks

- Make picks before lock time
- View past/current picks

- **Endpoints**:
  - `GET /leagues/:id/weeks/:weekId/picks/me`
  - `POST /leagues/:id/weeks/:weekId/picks`

### 📊 League Picks

- View other members' picks (if after lock)
- Expandable cards for each user

- **Endpoints**:
  - `GET /leagues/:id/weeks/:weekId/picks`

### ⚙️ League Settings

- Commissioners can:
  - Edit league settings (limited during season)
  - Start new season when applicable
- Members: view only

- **Endpoints**:
  - `GET /leagues/:id`
  - `PATCH /leagues/:id`
  - `POST /leagues/:id/seasons`

---

## 🧭 Navigation & Layout

- All screens (except login) have:
  - Top bar with user avatar
  - Drawer for theme toggle, profile, sign out, league list

---

## 🔐 Auth Notes

- Use PKCE flow on mobile
- Backend handles token exchange, user creation, JWT issuance
- Flutter stores JWT securely (e.g. `flutter_secure_storage`)

---

## 🔗 API Notes

- Backend is built in Node.js, Fastify, Drizzle ORM, SQLite (mocked endpoints for now)
- Use JWT for auth
- CORS configured for mobile

---

## Suggested API Structure

| Endpoint | Method | Description |
|----------|--------|-------------|
| /auth/oauth/token | POST | Exchange code for JWT |
| /users/setup | POST | Submit first-time user info |
| /users/me | GET/PATCH | Get or update profile |
| /users/me/leagues | GET | List user’s leagues |
| /invites/pending | GET | List pending invites |
| /leagues | GET/POST | Browse or create leagues |
| /leagues/:id | GET/PATCH | League info and update |
| /leagues/:id/members | GET | View members |
| /leagues/:id/invites | POST | Invite users |
| /leagues/:id/standings | GET | View standings |
| /leagues/:id/weeks/:weekId/picks | GET/POST | View or submit picks |
| /leagues/:id/seasons | POST | Start next season |

---

## Next Steps

- Scaffold Flutter screens with mocked data
- Integrate authentication and JWT storage
- Begin wiring screens to backend endpoints (as they’re implemented)

---