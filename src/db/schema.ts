import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

// just an example table for now to test initial connection and migrations
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  provider: varchar("provider", { length: 32 }).notNull(),
  providerUserId: varchar("provider_user_id", { length: 64 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 128 }),
  avatar: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
