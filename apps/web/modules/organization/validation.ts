import z from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const organizationProfileSchema = z.object(({
  companyName: z.string().nonempty("Company Name is required!"),
  email: z.array(
    z.object({
      value: z.string().email("Invalid email address."),
    })
  ),
  industry: z.string().nonempty("Industry is required!"),
  phone: z
    .string()
    .refine((val) => {
      if (!val) return false;
      try {
        const parsed = parsePhoneNumber(val);
        return parsed?.isValid();
      } catch {
        return false;
      }
    }, "Invalid phone number!"),
  website: z.string().optional(),
  address: z.string().min(1, "address is required!"),
  description: z.string().optional(),
  domain: z.string().optional(),
  locale: z.string().optional(),
  currency: z.string().optional(),
  logo: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .nullable()
    .optional(),
    timezone: z.string().optional(),
}));

export type OrganizationProfileForm = z.infer<typeof organizationProfileSchema>;