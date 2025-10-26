import { z } from "zod";

export const projectQuoteSchema = z.object({
  projectType: z.string().min(1, "Sélectionnez un type de projet"),
  designLevel: z.string().min(1, "Choisissez le niveau de design"),
  functionalScope: z
    .array(z.string())
    .min(1, "Ajoutez au moins une fonctionnalité clé"),
  marketingSupport: z.boolean().default(false),
  deadline: z.string().optional(),
  budgetRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }),
  paymentPreference: z.string().default("IBAN"),
  subscriptionModel: z
    .object({
      enabled: z.boolean(),
      monthly: z.number().nonnegative().optional(),
    })
    .optional(),
});

export type ProjectQuoteInput = z.infer<typeof projectQuoteSchema>;
