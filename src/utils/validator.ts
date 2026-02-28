import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório"),
  lastName: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  cpf: z.string().min(11, "CPF deve conter no mínimo 11 caracteres"),
  birthDate: z.string().optional(),
});

export const productFiltersSchema = z.object({
  page: z.coerce.number().positive("Página deve ser no mínimo 1").optional(),
  limit: z.coerce.number().positive("Limite deve ser no mínimo 1").optional(),
  minPrice: z.coerce.number().nonnegative("Preço mínimo deve ser positivo").optional(),
  maxPrice: z.coerce.number().nonnegative("Preço máximo deve ser positivo").optional(),
  search: z.string().optional(),
  sortBy: z.enum(["price", "name", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
