import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Имя пользователя обязательно"),
  password: z.string().min(1, "Пароль обязателен"),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
