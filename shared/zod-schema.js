// shared/zod-schema.js
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { orders, trials } from "./db-schema.js";

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
export const InsertOrder = z.infer(insertOrderSchema);
export const InsertTrial = z.infer(insertTrialSchema); 