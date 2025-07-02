import * as z from "zod/v4";

export const userStoreSchema = z.object({
  store: z.number().int().positive(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserType = z.infer<typeof userStoreSchema>;