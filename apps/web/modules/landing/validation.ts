import { z } from "zod";

export const organizationSchema = z.object({
  org_id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  domain: z.string().min(1, "Domain is required"),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  currency: z.string().length(3, "Currency must be 3 characters").optional(),
  timezone: z.string().optional().nullable(),
  locale: z.string().optional().nullable(),
  subscription_plan: z.enum(["Free", "Pro", "Enterprise"]).optional(),
  billing_customer_id: z.string().optional().nullable(),
  settings: z
    .object({
      theme: z.string().optional(),
      logo: z.string().optional(),
    })
    .optional()
    .nullable(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  created_at: z.string().datetime().optional(), // ISO string
  updated_at: z.string().datetime().optional(),
  deleted_at: z.string().datetime().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type organizationForm = z.infer<typeof organizationSchema>;


export const orgDetailSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  description: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  industry: z.string().min(1, 'Please select an industry'),
  size: z.string().min(1, 'Please select an organization size'),
  isPrivate: z.boolean(),
  logo: z.any().optional(),
});

export type orgDetailForm = z.infer<typeof orgDetailSchema>;
