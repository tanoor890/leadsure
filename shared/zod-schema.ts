// shared/zod-schema.ts
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { orders, trials } from "./db-schema";

// Zod schemas (frontend validation)
export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertTrialSchema = createInsertSchema(trials).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Types used in frontend (safe)
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertTrial = z.infer<typeof insertTrialSchema>;
