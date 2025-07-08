import * as z from "zod/v4";

export const userUpdateSchema = z.object({
  id: z.number().int(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type PasswordType = z.infer<typeof userUpdateSchema>;