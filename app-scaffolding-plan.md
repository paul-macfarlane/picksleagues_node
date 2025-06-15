# OAuth Backend Implementation Plan

## Overview

Implement an OAuth2 backend in **TypeScript**, using **Express**, **PostgreSQL**, **Drizzle ORM**, and **openid-client**. The backend will support **Google** and **Discord** logins, and integrate with a **mobile frontend** (Flutter) using the Authorization Code Flow with **PKCE**.

---

## Stack

- **Backend Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **OAuth Client**: openid-client
- **Frontend**: Flutter (mobile), using `flutter_appauth` or `oauth2_client`

---

## Features

- OAuth login with Google and Discord
- PKCE support for mobile clients
- User record management in PostgreSQL
- JWT issuance after login
- Stateless authentication via JWT
- Endpoint protection via middleware

---

## Implementation Steps

### 1. Project Setup

- [ ] Initialize a new Node.js TypeScript project
- [ ] Add dependencies:
  - `express`, `openid-client`, `jsonwebtoken`, `drizzle-orm`, `pg`
  - `zod` or similar for input validation

### 2. Configure Drizzle ORM

- [ ] Define `User` table schema
  - Fields: `id`, `provider`, `providerUserId`, `email`, `name`, `avatar`, `createdAt`, `updatedAt`
- [ ] Create `users` table migration and run it
- [ ] Setup Drizzle client

### 3. Setup OpenID-Client for Providers

- [ ] Discover Google and Discord OAuth endpoints
- [ ] Configure clients with appropriate redirect URIs
- [ ] Support PKCE (no client secret for mobile flow)

```ts
import { Issuer } from 'openid-client';
const googleIssuer = await Issuer.discover('https://accounts.google.com');
const discordIssuer = await Issuer.discover('https://discord.com');

const googleClient = new googleIssuer.Client({...});
const discordClient = new discordIssuer.Client({...});
```

### 4. OAuth Endpoints

- [ ] **POST /auth/oauth/token**

  - Input: `{ provider, code, codeVerifier, redirectUri }`
  - Use openid-client to exchange code for tokens
  - Fetch user info
  - Create or update user in DB
  - Return JWT

- [ ] **GET /me**
  - Requires JWT
  - Returns current user profile

### 5. JWT Handling

- [ ] Generate JWT after login
- [ ] Add middleware to authenticate JWT and attach user to request

### 6. Mobile Integration

- [ ] In Flutter, use `flutter_appauth` or `oauth2_client` to initiate OAuth
- [ ] Use PKCE flow: generate `code_verifier`, `code_challenge`
- [ ] After login, send `{ provider, code, codeVerifier, redirectUri }` to backend

### 7. Environment Variables

- [ ] `.env` should include:
  - `GOOGLE_CLIENT_ID`
  - `DISCORD_CLIENT_ID`
  - `JWT_SECRET`
  - `DATABASE_URL`

### 8. Security Considerations

- [ ] Enforce HTTPS in production
- [ ] Verify `code_challenge` with PKCE
- [ ] Properly validate tokens and user data
- [ ] Set CORS policy for mobile frontend

---

## Future Improvements

- Add refresh token support
- Add support for email/password auth
- Add organization or role models

---

## File Structure (example)

```
/src
  /auth
    google.ts
    discord.ts
    handler.ts
  /db
    schema.ts
    client.ts
  /middleware
    auth.ts
  /routes
    auth.ts
  server.ts
.env
```

---

## Endpoints Summary

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| POST   | /auth/oauth/token | Handle OAuth login w/ PKCE  |
| GET    | /me               | Return current user profile |

---

## Prompting Cursor

Use this plan to break out implementation into concrete tasks and scaffold TypeScript code.
