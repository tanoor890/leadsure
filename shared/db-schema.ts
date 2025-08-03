// shared/db-schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  apolloFilterLink: text("apollo_filter_link").notNull(),
  numberOfLeads: integer("number_of_leads").notNull(),
  paymentMethod: text("payment_method").notNull(),
  additionalRequirements: text("additional_requirements"),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trials = pgTable("trials", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  apolloFilterLink: text("apollo_filter_link").notNull(),
  businessType: text("business_type").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type exports
export type Order = typeof orders.$inferSelect;
export type Trial = typeof trials.$inferSelect;
