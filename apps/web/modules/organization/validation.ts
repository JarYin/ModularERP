import z from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const organizationProfileSchema = z.object({
  name: z.string().nonempty("Company Name is required!"),

  email: z.array(
    z.object({
      value: z.string().email("Invalid email address."),
    })
  ),

  phone: z.array(
    z.object({
      value: z.string().refine((val) => {
        if (!val) return false;
        try {
          const parsed = parsePhoneNumber(val);
          return parsed?.isValid();
        } catch {
          return false;
        }
      }, "Invalid phone number!"),
    })
  ).min(1, "Phone number is required!"),

  industry: z.string().nonempty("Industry is required!"),
  address: z.string().min(1, "address is required!"),
  website: z.string().optional(),
  description: z.string().optional(),
  domain: z.string().optional(),
  locale: z.string().optional(),
  currency: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  line: z.string().optional(),
  logo: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .nullable()
    .optional(),
  timezone: z.string().optional(),
});

export type OrganizationProfileForm = z.infer<typeof organizationProfileSchema>;
